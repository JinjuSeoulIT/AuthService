package common.mapper;

import java.util.List;


//응답
public interface EntityResMapper<E,D> {
D toDto(E entity);

List<D> toDto(List<E> entities);

}
