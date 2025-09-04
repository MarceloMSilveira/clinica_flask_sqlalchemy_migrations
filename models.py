from sqlalchemy.orm import Mapped, mapped_column, relationship
import sqlalchemy as sa
from typing import List
from db_definition import db
from sqlalchemy import String

class Paciente(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(unique=True)
    email: Mapped[str] = mapped_column(String(50))
    profissionais: Mapped[List["Profissional"]] = relationship(
        secondary="atendimento", back_populates="pacientes"
    )

class Profissional(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(unique=True)
    email: Mapped[str]
    pacientes: Mapped[List["Paciente"]] = relationship(
        secondary="atendimento", back_populates="profissionais"
    )

atendimento = db.Table(
    "atendimento",
    sa.Column("profissional_id", sa.ForeignKey(Profissional.id), primary_key=True),
    sa.Column("paciente_id", sa.ForeignKey(Paciente.id), primary_key=True)
)


