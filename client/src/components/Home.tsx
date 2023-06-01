import React,{useState} from 'react';
import { useSessionStorage } from '@mantine/hooks';

function Home() {

  const [logged, setLogged] = useSessionStorage({ key: 'logged', defaultValue: false });
  return (
    <div className="wrapper">
            <header>
                <img src="taverne.jpg" alt="" className="background"/>
                <div className="foreground">
                    <button id="viewSheet">Voir mes fiches</button>
                    <button id="createSheet">Créer une fiche</button>
                </div>
                <h1>Welcome in your tavern !</h1>
            </header>
        <div id="containerSheet">
            <article></article>
        </div>
        <div id="containerCreateSheet">

        </div>
    </div>
  );
}

export default Home;
