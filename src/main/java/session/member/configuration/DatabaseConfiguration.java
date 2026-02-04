package session.member.configuration;
//
//import org.apache.ibatis.session.SqlSessionFactory;
//import org.mybatis.spring.SqlSessionFactoryBean;
//import org.mybatis.spring.SqlSessionTemplate;
//import org.springframework.boot.context.properties.ConfigurationProperties;
//import org.springframework.context.ApplicationContext;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//
//import javax.sql.DataSource;


//마이바티스 -> 맵퍼 빈 저장소 흐름 내장객체 흐름도 (교육용 )
//@Configuration
public class DatabaseConfiguration {
//
//    private final ApplicationContext applicationContext;
//
//    public DatabaseConfiguration(ApplicationContext applicationContext) {
//        this.applicationContext = applicationContext;
//    }
//
//    // ✅ mybatis 설정
//    @Bean
//    @ConfigurationProperties(prefix = "mybatis.configuration")
//    public org.apache.ibatis.session.Configuration mybatisConfig() {
//        return new org.apache.ibatis.session.Configuration();
//    }
//
//
//    // ✅ SqlSessionFactory Bean
//    @Bean
//    public SqlSessionFactory sqlSessionFactory(DataSource dataSource) throws Exception {
//        SqlSessionFactoryBean factoryBean = new SqlSessionFactoryBean();
//        factoryBean.setDataSource(dataSource);
//        factoryBean.setMapperLocations(
//                applicationContext.getResources("classpath:/mapper/**/*.xml")
//        );
//        factoryBean.setConfiguration(mybatisConfig());
//        return factoryBean.getObject();
//    }
//
//
//    @Bean
//    public SqlSessionTemplate sqlSessionTemplate(SqlSessionFactory sqlSessionFactory) {
//        return new SqlSessionTemplate(sqlSessionFactory);
//    }
}