import React from "react";
import Wrapper from "./components/Wrapper";
// import Title from './components/Title';
import SearchBar from "./components/SearchBar";
import TableHead from "./components/TableHead";
import TableBody from "./components/TableBody";
import axios from "axios";

class App extends React.Component {
  state = {
    employees: [],
  };

  componentDidMount() {
    axios.get(
        `https://randomuser.me/api/?inc=name,email,dob,phone,picture&results=50`
      )
      .then((res) => {;
        const employees = res.data.results.map((item) => {
          return {
            image: item.picture.thumbnail,
            firstName: item.name.first,
            lastName: item.name.last,
            email: item.email,
            dob: item.dob.date
          }
        })
        this.setState({ employees });
      });
  }

  onSort(event, sortKey) {
    let randomBoolean = Math.random() < 0.5;
    // let randBool=randomBoolean;
    const employees = this.state.employees;
    console.log(employees)
    //ascending
    if(randomBoolean){
      employees.sort((a,b) => b[sortKey].localeCompare(a[sortKey]))
      this.setState({ employees })
      return randomBoolean = false

    } else {
    //decending
      employees.sort((a,b) => a[sortKey].localeCompare(b[sortKey]))
      this.setState({ employees })
      randomBoolean = true
    }
  }

  render() {
    return (
      <Wrapper>
        <SearchBar />
        <TableHead>
          <tr>
            <th>image</th>
            <th onClick={e => this.onSort(e, 'firstName')}>First Name</th>
            <th onClick={e => this.onSort(e, 'lastName')}>Last Name</th>
            <th>email</th>
            <th>DOB</th>
          </tr>
          {this.state.employees.map((item) => (
            <TableBody
              image={item.image}
              firstName={item.firstName}
              lastName={item.lastName}
              email={item.email}
              dob={item.dob}
            />
          ))}
        </TableHead>
      </Wrapper>
    );
  }
}
export default App;
