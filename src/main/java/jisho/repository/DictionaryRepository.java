package jisho.repository;

import jisho.domain.Dictionary;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Dictionary entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DictionaryRepository extends JpaRepository<Dictionary, Long> {



    @Query("select dictionary from Dictionary dictionary where dictionary.creator.login = ?#{principal.username}")
    List<Dictionary> findByCreatorIsCurrentUser();

    @Query(value = "select distinct dictionary from Dictionary dictionary left join fetch dictionary.users",
        countQuery = "select count(distinct dictionary) from Dictionary dictionary")
    Page<Dictionary> findAllWithEagerRelationships(Pageable pageable);

    @Query(value = "select distinct dictionary from Dictionary dictionary left join fetch dictionary.users")
    List<Dictionary> findAllWithEagerRelationships();

    @Query("select dictionary from Dictionary dictionary left join fetch dictionary.users where dictionary.id =:id")
    Optional<Dictionary> findOneWithEagerRelationships(@Param("id") Long id);

    @Query("select dictionary from Dictionary dictionary join dictionary.users user where user.login = :login")
    List<Dictionary> findAllCopiedByLogin(@Param("login") String login);
}
