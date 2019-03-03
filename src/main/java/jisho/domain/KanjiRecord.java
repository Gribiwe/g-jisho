package jisho.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A KanjiRecord.
 */
@Entity
@Table(name = "kanji_record")
public class KanjiRecord implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "jhi_value")
    private String value;

    @Column(name = "hiragana")
    private String hiragana;

    @Column(name = "katakana")
    private String katakana;

    @Column(name = "meaning")
    private String meaning;

    @Column(name = "note")
    private String note;

    @ManyToOne
    @JsonIgnoreProperties("kanjiRecords")
    private User creator;

    @ManyToMany
    @JoinTable(name = "kanji_record_dictionary",
               joinColumns = @JoinColumn(name = "kanji_record_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "dictionary_id", referencedColumnName = "id"))
    private Set<Dictionary> dictionaries = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getValue() {
        return value;
    }

    public KanjiRecord value(String value) {
        this.value = value;
        return this;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public String getHiragana() {
        return hiragana;
    }

    public KanjiRecord hiragana(String hiragana) {
        this.hiragana = hiragana;
        return this;
    }

    public void setHiragana(String hiragana) {
        this.hiragana = hiragana;
    }

    public String getKatakana() {
        return katakana;
    }

    public KanjiRecord katakana(String katakana) {
        this.katakana = katakana;
        return this;
    }

    public void setKatakana(String katakana) {
        this.katakana = katakana;
    }

    public String getMeaning() {
        return meaning;
    }

    public KanjiRecord meaning(String meaning) {
        this.meaning = meaning;
        return this;
    }

    public void setMeaning(String meaning) {
        this.meaning = meaning;
    }

    public String getNote() {
        return note;
    }

    public KanjiRecord note(String note) {
        this.note = note;
        return this;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public User getCreator() {
        return creator;
    }

    public KanjiRecord creator(User user) {
        this.creator = user;
        return this;
    }

    public void setCreator(User user) {
        this.creator = user;
    }

    public Set<Dictionary> getDictionaries() {
        return dictionaries;
    }

    public KanjiRecord dictionaries(Set<Dictionary> dictionaries) {
        this.dictionaries = dictionaries;
        return this;
    }

    public KanjiRecord addDictionary(Dictionary dictionary) {
        this.dictionaries.add(dictionary);
        dictionary.getKanjiRecords().add(this);
        return this;
    }

    public KanjiRecord removeDictionary(Dictionary dictionary) {
        this.dictionaries.remove(dictionary);
        dictionary.getKanjiRecords().remove(this);
        return this;
    }

    public void setDictionaries(Set<Dictionary> dictionaries) {
        this.dictionaries = dictionaries;
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
        KanjiRecord kanjiRecord = (KanjiRecord) o;
        if (kanjiRecord.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), kanjiRecord.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "KanjiRecord{" +
            "id=" + getId() +
            ", value='" + getValue() + "'" +
            ", hiragana='" + getHiragana() + "'" +
            ", katakana='" + getKatakana() + "'" +
            ", meaning='" + getMeaning() + "'" +
            ", note='" + getNote() + "'" +
            "}";
    }
}
