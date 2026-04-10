-- CMH STAFF/DEPARTMENT ID migration
-- - STAFF.STAFF_ID: NUMBER -> VARCHAR2(30)
-- - STAFF.STAFF_DEPARTMENT_ID: NUMBER -> VARCHAR2(30)
-- - STAFF_DEPARTMENT.DEPARTMENT_ID: NUMBER -> VARCHAR2(30)
-- - STAFF_DEPARTMENT.MANAGER_ID: NUMBER -> VARCHAR2(30)
-- - AUTH_USER.STAFF_ID: NUMBER -> VARCHAR2(30)

DECLARE
    PROCEDURE drop_constraint_if_exists(p_table_name IN VARCHAR2, p_constraint_name IN VARCHAR2) IS
        v_count NUMBER;
    BEGIN
        SELECT COUNT(*) INTO v_count
          FROM ALL_CONSTRAINTS
         WHERE OWNER = 'CMH'
           AND TABLE_NAME = p_table_name
           AND CONSTRAINT_NAME = p_constraint_name;

        IF v_count > 0 THEN
            EXECUTE IMMEDIATE 'ALTER TABLE CMH.' || p_table_name || ' DROP CONSTRAINT ' || p_constraint_name;
        END IF;
    END;

    PROCEDURE add_constraint_if_missing(p_constraint_name IN VARCHAR2, p_ddl IN VARCHAR2) IS
        v_count NUMBER;
    BEGIN
        SELECT COUNT(*) INTO v_count
          FROM ALL_CONSTRAINTS
         WHERE OWNER = 'CMH'
           AND CONSTRAINT_NAME = p_constraint_name;

        IF v_count = 0 THEN
            EXECUTE IMMEDIATE p_ddl;
        END IF;
    END;

    PROCEDURE alter_column_to_varchar30_if_needed(p_table_name IN VARCHAR2, p_column_name IN VARCHAR2) IS
        v_data_type   VARCHAR2(30);
        v_data_length NUMBER;
    BEGIN
        SELECT DATA_TYPE, DATA_LENGTH
          INTO v_data_type, v_data_length
          FROM ALL_TAB_COLUMNS
         WHERE OWNER = 'CMH'
           AND TABLE_NAME = p_table_name
           AND COLUMN_NAME = p_column_name;

        IF v_data_type <> 'VARCHAR2' OR v_data_length < 30 THEN
            EXECUTE IMMEDIATE 'ALTER TABLE CMH.' || p_table_name ||
                              ' MODIFY (' || p_column_name || ' VARCHAR2(30))';
        END IF;
    EXCEPTION
        WHEN NO_DATA_FOUND THEN
            NULL;
    END;
BEGIN
    -- Drop dependent constraints first.
    drop_constraint_if_exists('AUTH_USER', 'FK_AUTH_USER_STAFF');
    drop_constraint_if_exists('STAFF_DEPARTMENT', 'FK_STAFF_DEPT_MANAGER');
    drop_constraint_if_exists('STAFF', 'FK_STAFF_DEPARTMENT_ID');
    drop_constraint_if_exists('AUTH_USER', 'UQ_AUTH_USER_STAFF_ID');
    drop_constraint_if_exists('STAFF', 'PK_STAFF_MAIN');
    drop_constraint_if_exists('STAFF_DEPARTMENT', 'PK_STAFF_DEPARTMENT_MAIN');

    -- Alter target columns to VARCHAR2(30).
    alter_column_to_varchar30_if_needed('AUTH_USER', 'STAFF_ID');
    alter_column_to_varchar30_if_needed('STAFF', 'STAFF_ID');
    alter_column_to_varchar30_if_needed('STAFF', 'STAFF_DEPARTMENT_ID');
    alter_column_to_varchar30_if_needed('STAFF_DEPARTMENT', 'DEPARTMENT_ID');
    alter_column_to_varchar30_if_needed('STAFF_DEPARTMENT', 'MANAGER_ID');

    -- Recreate constraints.
    add_constraint_if_missing(
            'PK_STAFF_MAIN',
            'ALTER TABLE CMH.STAFF ADD CONSTRAINT PK_STAFF_MAIN PRIMARY KEY (STAFF_ID)'
    );
    add_constraint_if_missing(
            'PK_STAFF_DEPARTMENT_MAIN',
            'ALTER TABLE CMH.STAFF_DEPARTMENT ADD CONSTRAINT PK_STAFF_DEPARTMENT_MAIN PRIMARY KEY (DEPARTMENT_ID)'
    );
    add_constraint_if_missing(
            'UQ_AUTH_USER_STAFF_ID',
            'ALTER TABLE CMH.AUTH_USER ADD CONSTRAINT UQ_AUTH_USER_STAFF_ID UNIQUE (STAFF_ID)'
    );
    add_constraint_if_missing(
            'FK_AUTH_USER_STAFF',
            'ALTER TABLE CMH.AUTH_USER ADD CONSTRAINT FK_AUTH_USER_STAFF FOREIGN KEY (STAFF_ID) REFERENCES CMH.STAFF (STAFF_ID)'
    );
    add_constraint_if_missing(
            'FK_STAFF_DEPARTMENT_ID',
            'ALTER TABLE CMH.STAFF ADD CONSTRAINT FK_STAFF_DEPARTMENT_ID FOREIGN KEY (STAFF_DEPARTMENT_ID) REFERENCES CMH.STAFF_DEPARTMENT (DEPARTMENT_ID)'
    );
    add_constraint_if_missing(
            'FK_STAFF_DEPT_MANAGER',
            'ALTER TABLE CMH.STAFF_DEPARTMENT ADD CONSTRAINT FK_STAFF_DEPT_MANAGER FOREIGN KEY (MANAGER_ID) REFERENCES CMH.STAFF (STAFF_ID)'
    );
END;
/
