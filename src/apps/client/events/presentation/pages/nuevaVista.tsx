import React from 'react';

export const NuevaVista: React.FC =() => {
    return (
        <div className='misGustos'>
            <h1>
                Mis Gustos
            </h1>
            <div>
                <img 
                style={{
                    width: '50px',
                    height: '50px'
                }}
                src='https://scontent-lga3-2.xx.fbcdn.net/v/t39.30808-1/450617063_3733916840186646_8298713612634274714_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=109&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeFmEF_4y9FB9FcrfZ3TH2ZjCnS1tKi8TfgKdLW0qLxN-CEIJLduEF6zwCYThUO2XauW09bezrH9CaBcq97CWsrO&_nc_ohc=8kHdgcPN1_oQ7kNvwHrABGV&_nc_oc=AdlCZkd9I4KLmfxsJTdyZyatkO-kD-7w-5YfUHACnxiiug4oS1wYXD18ff31rAjhKn0&_nc_zt=24&_nc_ht=scontent-lga3-2.xx&_nc_gid=tG2kVh2LOavlhn1_SXxNcQ&oh=00_Afm4cKfMAQoZXxGb3nibny8S-TPAbZhfYO8uXiuNubUpVg&oe=6959E79A'></img>
                <div className='hobies'>
                    <h2>
                    Hobies
                    </h2>
                    <ul>
                        <li>programar</li>
                        <li>videojuegos</li>
                        <li>anime</li>
                        <li>ilustrtar</li>
                        <li>patinar</li>
                    </ul>
                </div>

                <div className='favoritos'>
                    <h2>
                    favoritos 
                    </h2>
                    <ul>
                        <li>Banda musica: Limp Bizkit</li>
                        <li>videojuego: Hollow Knight</li>
                        <li>anime: One Piece</li>
                    </ul>
                </div>
                
            </div>
        </div>
        
    );
};
