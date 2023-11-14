import React, { useState } from 'react';
import { useOrder } from './OrderContext';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { TextField } from "@material-ui/core";
import { blue } from '@mui/material/colors';
import Chip from '@mui/material/Chip';

function ContextApp(props) {
    const {
        cart,
        order,
        userId,
        purchaseDate,
        udm,
        addOrder,
        setUdm,
        orderPrice
    } = useOrder();

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));





    return (
        <div>

            <Item>
                <toolbar>
                    <h1>YOUR POLICIES</h1>
                    <h2>Total Price: {orderPrice} <Button onClick={addOrder} variant="contained" color="primary">
                        Buy Now
                    </Button></h2>


                </toolbar>
                {cart?.policies?.map((c) => (
                    <div className='card' key={c.policyId}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '50vh',
                            }}
                        >
                            <Card sx={{
                                width: 600,
                                backgroundColor: '#D9E3F5', // Light background color
                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Subtle shadow
                                borderRadius: '8px',
                                transition: 'transform 0.3s',
                                '&:hover': {
                                    transform: 'scale(1.02)',
                                },

                            }} variant="outlined">
                                <CardContent>
                                    <Typography color="text.secondary" gutterBottom>
                                        <b><h2>{c.policyName}</h2></b>
                                    </Typography>
                                    <Typography component="div">
                                        <b>{c.policyCompany}</b>
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        {c.policyType.policyTypeValue} Insurance
                                    </Typography>
                                    <Typography color="text.secondary">
                                        <b>$ {c.policyPrice}</b>
                                    </Typography>
                                    <Typography variant="body2">
                                        {c.benefit.benefitValue.replace(/"/g, ' ')}
                                    </Typography>
                                    <br />
                                    <Button variant="outlined" color="error">
                                        REMOVE
                                    </Button>
                                </CardContent>
                            </Card>
                        </Box>

                    </div>
                ))}
            </Item>

            <Item>


            </Item>


        </div>
    );
}

export default ContextApp;
