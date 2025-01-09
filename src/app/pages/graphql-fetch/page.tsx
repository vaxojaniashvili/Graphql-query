"use client"
import React, { useEffect, useState } from 'react';

const GraphqlFetch = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://graphql-pokemon2.vercel.app/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        query: `
              {
                pokemons(first: 10) {
                  name
                  id
                  image
                }
              }
            `,
                    }),
                });

                const result = await response.json();
                setData(result.data.pokemons);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);
    console.log("data", data);
    return (
            <div className="flex flex-wrap gap-[50px] justify-center">
                {data.map((item: { name: string,id:number,image:string }, index) => (
                        <div className="flex  justify-center" key={item.id}>
                            <div className="flex items-center">
                                <p key={index}>{item.name}</p>
                                <img src={item.image}/>
                            </div>
                        </div>
                    )
                )}
            </div>
    )
        ;
};

export default GraphqlFetch;
