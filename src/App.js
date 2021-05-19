import React from "react";
import Wrapper from "./components/Wrapper";
// import Title from './components/Title';
// import friends from './friends.json';
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
        `https://randomuser.me/api/?inc=name,email,dob,phone,picture&results=10`
      )
      .then((res) => {;
        const employees = res.data.results;
        this.setState({ employees });
      });
  }
  // removeFriend = id => {
  //   const friends = this.state.friends.filter(friend => friend.id !== id);
  //    this.setState({ friends });
  // };
  onSort(event, sortKey) {
    let randomBoolean = Math.random() < 0.5;
    let randBool=randomBoolean;
    const employees = this.state.employees;
    console.log(employees)
    //ascending
    if(randomBoolean){employees.sort((a,b) => b[sortKey].localeCompare(a[sortKey]))
    } else {employees.sort((a,b) => a[sortKey].localeCompare(b[sortKey]))
    }
    randBool = !randomBoolean
    //descending
    this.setState({ employees })
  }

  render() {
    return (
      <Wrapper>
        <SearchBar />
        <TableHead>
          <tr>
            <th>image</th>
            <th onClick={e => this.onSort(e, 'employees.name.first')}>First Name</th>
            <th>Last Name</th>
            <th>email</th>
            <th>DOB</th>
          </tr>
          {this.state.employees.map((item) => (
            <TableBody
              image={item.picture.thumbnail}
              firstName={item.name.first}
              lastName={item.name.last}
              email={item.email}
              dob={item.dob.date}
            />
          ))}
        </TableHead>
      </Wrapper>
    );
  }
}
export default App;
