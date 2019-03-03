package jisho.repository;

import jisho.domain.KanjiRecord;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the KanjiRecord entity.
 */
@SuppressWarnings("unused")
@Repository
public interface KanjiRecordRepository extends JpaRepository<KanjiRecord, Long> {

    @Query("select kanji_record from KanjiRecord kanji_record where kanji_record.creator.login = ?#{principal.username}")
    List<KanjiRecord> findByCreatorIsCurrentUser();

    @Query(value = "select distinct kanji_record from KanjiRecord kanji_record left join fetch kanji_record.dictionaries",
        countQuery = "select count(distinct kanji_record) from KanjiRecord kanji_record")
    Page<KanjiRecord> findAllWithEagerRelationships(Pageable pageable);

    @Query(value = "select distinct kanji_record from KanjiRecord kanji_record left join fetch kanji_record.dictionaries")
    List<KanjiRecord> findAllWithEagerRelationships();

    @Query("select kanji_record from KanjiRecord kanji_record left join fetch kanji_record.dictionaries where kanji_record.id =:id")
    Optional<KanjiRecord> findOneWithEagerRelationships(@Param("id") Long id);

}
