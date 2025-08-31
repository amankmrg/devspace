import React from 'react'
import items from './items'
import { notFound } from 'next/navigation';

type category = "blogs" | "experience" | "projects"; 

const Category = async({params}:{params:Promise<{category:string}>}) => {

  const {category} = await params;
  const val = items[category as category];
  if(!val) return notFound();

  return (
    <div>
      {val.map((item)=>(
        <div key={item.id}>
          <h2>{item.title}</h2>
          <p>{item.description}</p>
        </div>
      ))}

    </div>
  )
}

export default Category