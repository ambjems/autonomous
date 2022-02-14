import React from 'react';
import Title from './Title';
import SearchBoxAndFreeda from './SearchBoxAndFreeda';
import AutonomousRecievables from './AutonomousRecievables';
export default function Header() {
    return (
        <div style={{display:'flex', flexDirection:'row', borderBox:'box-sizing'}}>
           <Title/>
           <AutonomousRecievables/>
           <SearchBoxAndFreeda/>   
        </div>
    )
}
