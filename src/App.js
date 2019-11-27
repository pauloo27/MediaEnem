import React, { Component } from 'react';

import './styles/App.scss';

import GradeInput from "./components/GradeInput"

const gradesName = ["Ciências Naturais", "Ciências Humanas", "Linguagens", "Matemática", "Redação"]

class App extends Component {
  state = { avg: NaN, grades: undefined }

  populateGrades(grades) {
    gradesName.forEach(name => {
      grades[name] = { grade: NaN, weight: 1 }
    })
    return grades;
  }

  componentDidMount() {
    var gradesJson = localStorage.getItem("grades")
    var grades = {}
    if (gradesJson === null) {
      grades = this.populateGrades(grades);
    } else {
      try {
        grades = JSON.parse(gradesJson)
      } catch (e) {
        grades = this.populateGrades(grades);
      }
    }

    this.setState({ grades: grades })
    this.updateAvg(grades)
  }

  updateAvg(grades) {
    if (grades === null) grades = this.state.grades
    var avg = 0
    var weightTotal = 0
    for (var gradeName in grades) {
      const { grade, weight } = grades[gradeName]
      if (Number.isNaN(grade)) continue;

      avg += grade * weight
      weightTotal += weight
    }
    this.setState({ avg: avg / weightTotal })
  }

  updateGrade = (name, grade, weight) => {
    var grades = this.state.grades
    grades[name] = { grade: grade, weight: weight }
    this.setState({ grade: grade })

    this.updateAvg(grades)

    localStorage.setItem("grades", JSON.stringify(grades))
  }

  render() {
    if (!this.state.grades) return null
    return <div className="App" >
      <center>
        <h2 id="header">Média Ponderada</h2>
        <br></br>
        <div id="table-container">
          <table>
            <thead>
              <tr>
                <th>Matéria</th>
                <th>Nota</th>
                <th>Peso</th>
              </tr>
            </thead>
            <tbody>
              {gradesName.map(name => {
                return <GradeInput
                  name={name}
                  key={name}
                  onUpdate={this.updateGrade}
                  grade={this.state.grades[name].grade}
                  weight={this.state.grades[name].weight}
                />
              })}
            </tbody>
          </table>
          <br />
          <h2>{Number.isNaN(this.state.avg) ? '' : `Sua média é ${this.state.avg.toFixed(2)}.`}</h2>
        </div>
        <br />
        <p id="created-by">Criado por <span><a href="https://github.com/Pauloo27">Pauloo27</a></span> usando ReactJS.</p>
      </center>
    </div>
  }
}

export default App;
