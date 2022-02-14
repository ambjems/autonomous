import React from 'react';
import Header from './Header';
import Footer from './Footer';
import MainCards from './MainCards';

export default function Content() {
    return (
        <div 
            style={{marginLeft: '4vw', 
            width:'96vw', 
            height:'100vh', 
            display:'flex', 
            flexDirection:'column'}}>
            
             <div 
                style={{
                height:'8.5%', 
                width:'100%'}}>
                <Header />
             </div>

            <div 
                style={{height:'90%', 
                        width:'100%', 
                        display:'flex', 
                        flexDirection:'row'}}>
                <MainCards />
            </div>

            <div 
                style={{backgroundColor:'#39495E', 
                        height:'3%', width:'100%'}}>
                 <Footer />
            </div>

        </div>
    )
}
