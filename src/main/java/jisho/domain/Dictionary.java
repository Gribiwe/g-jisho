package jisho.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Dictionary.
 */
@Entity
@Table(name = "dictionary")
public class Dictionary implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @ManyToOne
    @JsonIgnoreProperties("dictionaries")
    private User creator;


    @ManyToMany
    @JoinTable(name = "dictionary_user",
               joinColumns = @JoinColumn(name = "dictionary_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"))
    private Set<User> users = new HashSet<>();

    @ManyToMany(mappedBy = "dictionaries")
    @JsonIgnore
    private Set<KanjiRecord> kanjiRecords = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Dictionary name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public User getCreator() {
        return creator;
    }

    public Dictionary creator(User user) {
        this.creator = user;
        return this;
    }

    public void setCreator(User user) {
        this.creator = user;
    }

    public Set<User> getUsers() {
        return users;
    }

    public Dictionary users(Set<User> users) {
        this.users = users;
        return this;
    }

    public Dictionary addUser(User user) {
        this.users.add(user);
        return this;
    }

    public Dictionary removeUser(User user) {
        this.users.remove(user);
        return this;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }

    public Set<KanjiRecord> getKanjiRecords() {
        return kanjiRecords;
    }

    public Dictionary kanjiRecords(Set<KanjiRecord> kanjiRecords) {
        this.kanjiRecords = kanjiRecords;
        return this;
    }

    public Dictionary addKanjiRecord(KanjiRecord kanjiRecord) {
        this.kanjiRecords.add(kanjiRecord);
        kanjiRecord.getDictionaries().add(this);
        return this;
    }

    public Dictionary removeKanjiRecord(KanjiRecord kanjiRecord) {
        this.kanjiRecords.remove(kanjiRecord);
        kanjiRecord.getDictionaries().remove(this);
        return this;
    }

    public void setKanjiRecords(Set<KanjiRecord> kanjiRecords) {
        this.kanjiRecords = kanjiRecords;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Dictionary dictionary = (Dictionary) o;
        if (dictionary.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), dictionary.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Dictionary{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
