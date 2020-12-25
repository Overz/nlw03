CREATE TABLE orfanato
(
    cdOrfanato    TEXT NOT NULL,
    cdImagem      TEXT NOT NULL,
    nmOrfanato    TEXT NOT NULL,
    deLatitude    TEXT NOT NULL,
    deSobre       TEXT NOT NULL,
    deInstrucao   TEXT NOT NULL,
    deAbertura    TEXT NOT NULL,
    deAbertoFinds BOOL NOT NULL,

    CONSTRAINT pk_orfanato PRIMARY KEY (cdOrfanato),
    CONSTRAINT fk_orfanato_imagem FOREIGN KEY (cdImagem) REFERENCES imagem (cdImagem)
);

CREATE INDEX ix_orfanato_imagem ON orfanato (cdImagem);