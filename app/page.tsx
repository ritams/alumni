
import React from 'react';
import fs from 'fs';
import path from 'path';
import ClientHome from './ClientHome';

const getData = () => {
    const filePath = path.join(process.cwd(), 'data', 'alumni.json');
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(jsonData);
};

export default function Home() {
    const alumni = getData();
    return <ClientHome alumni={alumni} />;
}
