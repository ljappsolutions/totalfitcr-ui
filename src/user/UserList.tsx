
import React, { useState } from "react"
import { Grid } from "@material-ui/core"
import { createUseStyles } from "react-jss";
import MaterialTable, { Column } from 'material-table';
import { tableIcons } from "../shared/table-icons";


interface IUser {
  name: string;
  lastName: string;
  email: string;
  phone: string;
  IsActive: boolean;
  id: string;
}

interface TableState {
  columns: Array<Column<IUser>>;
  data: IUser[];
}

const usersList: Array<IUser> = [{ name: 'Juan Daniel', lastName: "Sánchez Cambronero", email: "juansanchez@gmail.com", phone: "87872323", IsActive: true, id: "107450345" }];

export const UserList: React.FunctionComponent = () => {
  const [state, setState] = useState<TableState>({
    columns: [
      { title: 'Nombre', field: 'name' },
      { title: 'Apellidos', field: 'lastName' },
      { title: 'Correo', field: 'email' },
      { title: 'Teléfono', field: 'phone' },
      { title: 'Cédula', field: 'id' },
      { title: 'Activo', field: 'IsActive' },

     // {
       // title: 'Birth Place',
       // field: 'birthCity',
        //lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
     // },
    ],
    data: usersList
  });

  const useStyles = createUseStyles({
    container: {
      "margin": "15px"
    },
    column: {
      padding: "0 5px"
    },
    select: {
      "margin": "15px"
    }
  });
  const classes = useStyles();

  return (<>
    <Grid container className={classes.container}>
      <Grid item xs={1}></Grid>
      <Grid item xs={10}>
        <Grid container className={classes.container}>
          <Grid item xs={12} className={classes.column} >
            <MaterialTable
            icons={tableIcons}
              title="Listado de usuarios"
              columns={state.columns}
              data={state.data}
              editable={{
                onRowUpdate: (newData, oldData) =>
                  new Promise((resolve) => {
                    setTimeout(() => {
                      resolve();
                      if (oldData) {
                        setState((prevState) => {
                          const data = [...prevState.data];
                          data[data.indexOf(oldData)] = newData;
                          return { ...prevState, data };
                        });
                      }
                    }, 600);
                  }),
              }}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={1}></Grid>
    </Grid>
  </>)
}