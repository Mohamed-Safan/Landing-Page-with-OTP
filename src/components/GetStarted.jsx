import React from 'react';
import { 
    Box,
    Grid,
    styled,
    Typography,
} from '@mui/material';
import Title from './Title';
// img
import imgDetail from '../assets/pexels-alex-staudinger-1732414.jpg';
import imgDetail2 from '../assets/pexels-pixabay-271816.jpg';

const GetStarted = () => {

    const CustomGridItem = styled(Grid)({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    });
    
    const CustomTypography = styled(Typography)({
        fontSize: '1.1rem',
        textAlign: 'start',
        lineHeight: '1.5',
        color: '#515151',
        marginTop: '1.5rem',
    });

    return (        
        <Grid container spacing={{ xs: 4, sm: 4, md: 0 }}   
        sx={{
            py: 10,
            px: 2,
        }}>
            <CustomGridItem item xs={12} sm={8} md={6} 
            component='section'>
                <Box component='article'
                sx={{
                    px: 4,
                }}>
                    <Title
                    text={'Seamless Solutions for Explorers and Hosts Alike'}
                    textAlign={'start'}
                    />
                    <CustomTypography>
                    Stay Ahead of the Adventure: Find Your Ideal <br/>Retreat Among Freshly Updated Listings, <br/> Ensuring Every Moment Counts
                    </CustomTypography> 
                </Box>
            </CustomGridItem>
            
            <Grid item xs={12} sm={4} md={6}>
                <img src={imgDetail} alt="" 
                style={{
                    width: '100%',
                }}
                />
            </Grid>

            <Grid item xs={12} sm={4} md={6}
            sx={{
                order: {xs: 4, sm: 4, md: 3}
            }}>
                <img src={imgDetail2} alt="" 
                style={{ 
                    width: "100%",
                }}
                />
            </Grid>

            <CustomGridItem item xs={12} sm={8} md={6}
            sx={{
                order: {xs: 3, sm: 3, md: 4}
            }}>
                <Box component='article'
                sx={{
                    px: 4,
                }}>
                    <Title
                    text={'Streamlined Solutions for Tenants and Landlords'}
                    textAlign={'start'}
                    />
                    <CustomTypography>
                    Effortlessly Navigate Your Journey: With Our Continuous Updates, <br /> Uncover Homes Right as They Hit the Market, <br /> Ensuring Your Perfect Retreat Awaits</CustomTypography>
                </Box>
            </CustomGridItem>

            



           
            
        </Grid>   
    );
};

export default GetStarted;
