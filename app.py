from flask import Flask, render_template, request, redirect, url_for
from models import Paciente, Profissional, atendimento
from db_definition import db

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql://marcelopostgresuser:73$Rps@localhost:5432/integrare"

db.init_app(app)

@app.route("/")
def home():
    return render_template("profissionais.html")
    #return "<p>test</p>"

@app.route("/profissionais")
def prof_list():
    profissionais = db.session.execute(db.select(Profissional)).scalars().all()
    return render_template("profissionais.html", profissionais=profissionais)

@app.route("/profissionais", methods = ['POST'])
def add_profissional():
    new_name = request.form['name']
    new_email = request.form['email']
    new_profissional = Profissional(
        name = new_name,
        email = new_email
    )

    db.session.add(new_profissional)
    db.session.commit()

    return redirect(url_for('prof_list'))


@app.route("/profissional/delete", methods = ['POST'])
def delete_profissional():
    id = request.form['id']
    profissional = db.get_or_404(Profissional, id)
    db.session.delete(profissional)
    db.session.commit()
    return redirect(url_for('prof_list'))

@app.route("/profissional/update", methods = ['POST'])
def update_profissional():
    name = request.form['name']
    newName = request.form['novoNome']
    print(name)
    print(newName)
    profissional = db.session.execute(db.select(Profissional).filter_by(name=name)).scalar_one()
    profissional.name = newName
    db.session.commit()
    return redirect(url_for('prof_list'))
