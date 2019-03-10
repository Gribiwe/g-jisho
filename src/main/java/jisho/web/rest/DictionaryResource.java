package jisho.web.rest;
import jisho.domain.Dictionary;
import jisho.domain.User;
import jisho.repository.DictionaryRepository;
import jisho.repository.UserRepository;
import jisho.security.SecurityUtils;
import jisho.web.rest.errors.BadRequestAlertException;
import jisho.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.hibernate.Hibernate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Dictionary.
 */
@RestController
@RequestMapping("/api")
public class DictionaryResource {

    private final Logger log = LoggerFactory.getLogger(DictionaryResource.class);

    private static final String ENTITY_NAME = "dictionary";

    private final DictionaryRepository dictionaryRepository;

    private final UserRepository userRepository;

    public DictionaryResource(DictionaryRepository dictionaryRepository, UserRepository userRepository) {
        this.dictionaryRepository = dictionaryRepository;
        this.userRepository = userRepository;
    }

    /**
     * POST  /dictionaries : Create a new dictionary.
     *
     * @param dictionary the dictionary to create
     * @return the ResponseEntity with status 201 (Created) and with body the new dictionary, or with status 400 (Bad Request) if the dictionary has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/dictionaries")
    public ResponseEntity<Dictionary> createDictionary(@RequestBody Dictionary dictionary) throws URISyntaxException {
        log.debug("REST request to save Dictionary : {}", dictionary);
        if (dictionary.getId() != null) {
            throw new BadRequestAlertException("A new dictionary cannot already have an ID", ENTITY_NAME, "idexists");
        }
        String currentUser = SecurityUtils.getCurrentUserLogin().get();
        User user1 = userRepository.findOneByLogin(currentUser).get();
        dictionary.addUser(user1);
        dictionary.setCreator(user1);

        Dictionary result = dictionaryRepository.save(dictionary);
        return ResponseEntity.created(new URI("/api/dictionaries/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /dictionaries : Updates an existing dictionary.
     *
     * @param dictionary the dictionary to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated dictionary,
     * or with status 400 (Bad Request) if the dictionary is not valid,
     * or with status 500 (Internal Server Error) if the dictionary couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/dictionaries")
    public ResponseEntity<Dictionary> updateDictionary(@RequestBody Dictionary dictionary) throws URISyntaxException {
        log.debug("REST request to update Dictionary : {}", dictionary);
        if (dictionary.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Dictionary result = dictionaryRepository.save(dictionary);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, dictionary.getId().toString()))
            .body(result);
    }

    /**
     * GET  /dictionaries : get all the dictionaries.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many)
     * @return the ResponseEntity with status 200 (OK) and the list of dictionaries in body
     */
    @GetMapping("/dictionaries")
    public List<Dictionary> getAllDictionaries(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all Dictionaries");
        List<Dictionary> all = dictionaryRepository.findAll();
        for (Dictionary dictionary : all) {
            Hibernate.initialize(dictionary.getUsers());
            Hibernate.initialize(dictionary.getKanjiRecords());
        }
        return all;
    }

    /**
     * GET  /dictionaries/:id : get the "id" dictionary.
     *
     * @param id the id of the dictionary to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the dictionary, or with status 404 (Not Found)
     */
    @GetMapping("/dictionaries/{id}")
    public ResponseEntity<Dictionary> getDictionary(@PathVariable Long id) {
        log.debug("REST request to get Dictionary : {}", id);
        Optional<Dictionary> dictionary = dictionaryRepository.findOneWithEagerRelationships(id);
        Hibernate.initialize(dictionary.get().getUsers());
        Hibernate.initialize(dictionary.get().getKanjiRecords());
        return ResponseUtil.wrapOrNotFound(dictionary);
    }

    @GetMapping("/dictionaries/getMy")
    public List<Dictionary> getMyDictionaries(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        String currentUser = SecurityUtils.getCurrentUserLogin().get();
        List<Dictionary> allCopiedByLogin = dictionaryRepository.findAllCopiedByLogin(currentUser);
        for (Dictionary dictionary : allCopiedByLogin) {
            Hibernate.initialize(dictionary.getUsers());
            Hibernate.initialize(dictionary.getKanjiRecords());
        }
        return allCopiedByLogin;
    }

    /**
     * DELETE  /dictionaries/:id : delete the "id" dictionary.
     *
     * @param id the id of the dictionary to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/dictionaries/{id}")
    public ResponseEntity<Void> deleteDictionary(@PathVariable Long id) {
        log.debug("REST request to delete Dictionary : {}", id);
        Dictionary one = dictionaryRepository.findById(id).get();
        String currentUser = SecurityUtils.getCurrentUserLogin().get();
        User user1 = userRepository.findOneByLogin(currentUser).get();

        one.removeUser(user1);
        if (one.getUsers().size() == 0) {
            dictionaryRepository.deleteById(id);
        } else {
            dictionaryRepository.save(one);
        }
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
