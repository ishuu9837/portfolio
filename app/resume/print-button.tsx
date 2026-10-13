'use client';
import { Download } from 'lucide-react';
export default function PrintButton(){return <button className="btn btn-primary print-button" onClick={()=>window.print()}>Print / save as PDF <Download size={16}/></button>}
