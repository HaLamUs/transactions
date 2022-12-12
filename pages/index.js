import React, { useEffect, useState, useCallback } from 'react'
import Router from 'next/router'
import { magic } from '../magic'
import Loading from '../components/loading'
import HeaderTable from '../components/headerTable';
import { Table, Grid, TableBody, TableRow, TableCell, Container } from "semantic-ui-react";
import moment from 'moment';

export default function Index() {
	const [userMetadata, setUserMetadata] = useState()
	const [didToken, setDidToken] = useState()
	const [callOnlyOnce, setcallOnlyOnce]= useState(2022);
	const [assets, setAssets] = useState([])
	const titles = ["Txn Hash", "Method", "Date", "From", "To"];

	async function getUserTransactions(token) {
    var requestOptions = {
      method: 'GET',
      headers:{
        'Authorization': 'Bearer ' + token
      },
    };
    const res = await fetch("http://localhost:8000/transactions", requestOptions);

		const data = await res.json();
    const blockDetails = data.user_transactions.map((block, index) => (
        <TableRow key={index} style={{ 'backgroundColor': '#B5E69A' }}>
          <TableCell >{block.txhash}</TableCell>
          <TableCell >{block.methodId}</TableCell>
          <TableCell >{moment(new Date(Number(block.timeStamp * 1000))).fromNow()}</TableCell>
          <TableCell >{block.fromW}</TableCell>
          <TableCell >{block.toW}</TableCell>
        </TableRow>
    ));
		setAssets(blockDetails);
		return data
	}

	useEffect(() => {
    const id = setInterval(() => {
      getUserTransactions(didToken)
    }, 15 * 60 * 1000); // every 15 mins will sync with the BE 
   
		magic.user.isLoggedIn().then((magicIsLoggedIn) => {
			if (magicIsLoggedIn) {
				magic.user.getMetadata().then(setUserMetadata)
				magic.user.getIdToken({ lifespan: 60 * 60 * 10 }).then(setDidToken)
			} else {
				// If no user is logged in, redirect to `/login`
				Router.push('/login')
			}
		})

	}, [])

	/**
	 * Perform logout action via Magic.
	 */
	const logout = useCallback(() => {
		magic.user.logout().then(() => {
			Router.push('/login')
		})
	}, [Router]);

  if (userMetadata && didToken) {
		if (callOnlyOnce === 2022) {
			setcallOnlyOnce(0)
			getUserTransactions(didToken);
		}
    return (
      <div>
        <p>Your email: {userMetadata.email}</p>
        <Table celled padded>
        <HeaderTable></HeaderTable>
        <TableBody>{assets}</TableBody>
        </Table>
      </div>
    )
  } else {
    <Loading />
  }
}
