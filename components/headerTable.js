import { Table, Label, TableBody, TableRow, TableCell, Container } from "semantic-ui-react";

export default function HeaderTable() {
  return (
    <Table.Header>
			<Table.Row style={{ 'backgroundColor': '#B5E69A' }}>
        <Table.HeaderCell>
          <h4>Tx Hash</h4>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <h4> Method </h4>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <h4> Date </h4>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <h4> From </h4>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <h4> To </h4>
        </Table.HeaderCell>
			</Table.Row>
		</Table.Header>
  );
}
