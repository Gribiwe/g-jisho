package jisho.web.rest;
import jisho.domain.KanjiRecord;
import jisho.repository.KanjiRecordRepository;
import jisho.web.rest.errors.BadRequestAlertException;
import jisho.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing KanjiRecord.
 */
@RestController
@RequestMapping("/api")
public class KanjiRecordResource {

    private final Logger log = LoggerFactory.getLogger(KanjiRecordResource.class);

    private static final String ENTITY_NAME = "kanjiRecord";

    private final KanjiRecordRepository kanjiRecordRepository;

    public KanjiRecordResource(KanjiRecordRepository kanjiRecordRepository) {
        this.kanjiRecordRepository = kanjiRecordRepository;
    }

    /**
     * POST  /kanji-records : Create a new kanjiRecord.
     *
     * @param kanjiRecord the kanjiRecord to create
     * @return the ResponseEntity with status 201 (Created) and with body the new kanjiRecord, or with status 400 (Bad Request) if the kanjiRecord has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/kanji-records")
    public ResponseEntity<KanjiRecord> createKanjiRecord(@RequestBody KanjiRecord kanjiRecord) throws URISyntaxException {
        log.debug("REST request to save KanjiRecord : {}", kanjiRecord);
        if (kanjiRecord.getId() != null) {
            throw new BadRequestAlertException("A new kanjiRecord cannot already have an ID", ENTITY_NAME, "idexists");
        }
        KanjiRecord result = kanjiRecordRepository.save(kanjiRecord);
        return ResponseEntity.created(new URI("/api/kanji-records/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /kanji-records : Updates an existing kanjiRecord.
     *
     * @param kanjiRecord the kanjiRecord to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated kanjiRecord,
     * or with status 400 (Bad Request) if the kanjiRecord is not valid,
     * or with status 500 (Internal Server Error) if the kanjiRecord couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/kanji-records")
    public ResponseEntity<KanjiRecord> updateKanjiRecord(@RequestBody KanjiRecord kanjiRecord) throws URISyntaxException {
        log.debug("REST request to update KanjiRecord : {}", kanjiRecord);
        if (kanjiRecord.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        KanjiRecord result = kanjiRecordRepository.save(kanjiRecord);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, kanjiRecord.getId().toString()))
            .body(result);
    }

    /**
     * GET  /kanji-records : get all the kanjiRecords.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many)
     * @return the ResponseEntity with status 200 (OK) and the list of kanjiRecords in body
     */
    @GetMapping("/kanji-records")
    public List<KanjiRecord> getAllKanjiRecords(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all KanjiRecords");
        return kanjiRecordRepository.findAllWithEagerRelationships();
    }

    /**
     * GET  /kanji-records/:id : get the "id" kanjiRecord.
     *
     * @param id the id of the kanjiRecord to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the kanjiRecord, or with status 404 (Not Found)
     */
    @GetMapping("/kanji-records/{id}")
    public ResponseEntity<KanjiRecord> getKanjiRecord(@PathVariable Long id) {
        log.debug("REST request to get KanjiRecord : {}", id);
        Optional<KanjiRecord> kanjiRecord = kanjiRecordRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(kanjiRecord);
    }

    /**
     * DELETE  /kanji-records/:id : delete the "id" kanjiRecord.
     *
     * @param id the id of the kanjiRecord to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/kanji-records/{id}")
    public ResponseEntity<Void> deleteKanjiRecord(@PathVariable Long id) {
        log.debug("REST request to delete KanjiRecord : {}", id);
        kanjiRecordRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
