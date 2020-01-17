import React, { Component } from "react";

const FieldType = Object.freeze({ grade: 1, weight: 2 });

class GradeInput extends Component {
  state = { lastWeight: 1 };

  constructor(props) {
    super(props);
    this.props.eventEmitter.on("import", (grade, value) => {
      if (this.props.name === grade) {
        document.getElementById(`${grade}-weight`).value = value;
      }
    });
  }

  handleUpdate = (e, min, max, gradeName, fieldType) => {
    var value = Number.parseFloat(e.target.value);
    if (e.target.value !== "") {
      if (value > max) {
        e.target.value = max;
        value = max;
      } else if (value < min) {
        e.target.value = min;
        value = min;
      }
    }

    var grade = this.props.grade;
    var weight = this.props.weight;

    if (fieldType === FieldType.grade) {
      grade = value;
    } else {
      weight = value;
    }

    this.props.onUpdate(gradeName, grade, weight);
  };

  render() {
    const gradeName = this.props.name;
    return (
      <tr>
        <td>{gradeName}</td>
        <td>
          <input
            type="number"
            className="form-control"
            id={gradeName}
            defaultValue={this.props.grade}
            min="10"
            max="1000"
            step="0.01"
            placeholder="Nota"
            onChange={e =>
              this.handleUpdate(e, 0, 1000, this.props.name, FieldType.grade)
            }
          />
        </td>
        <td>
          <input
            type="number"
            className="form-control"
            id={`${gradeName}-weight`}
            defaultValue={this.props.weight}
            min="1"
            max="5"
            placeholder="Peso"
            onFocus={e => {
              if (e.target.value !== "") {
                this.setState({ lastWeight: e.target.value });
              }
              e.target.value = "";
            }}
            onBlur={e =>
              (e.target.value =
                e.target.value === "" ? this.state.lastWeight : e.target.value)
            }
            onChange={e =>
              this.handleUpdate(e, 1, 5, this.props.name, FieldType.weight)
            }
          />
        </td>
      </tr>
    );
  }
}

export default GradeInput;
