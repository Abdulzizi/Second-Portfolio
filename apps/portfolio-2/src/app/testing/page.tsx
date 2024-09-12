"use client"
import React, { useEffect, useState } from 'react';
import { getSocialAccounts } from '@/app/dataFetch';

interface SocialAccount {
    provider: string;
    url: string;
}

const TestingComponent = () => {
    const [socialAccounts, setSocialAccounts] = useState<SocialAccount[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const username = 'Abdulzizi';

                const social = await getSocialAccounts(username);
                console.log('Social Accounts:', social);
                setSocialAccounts(social);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>Testing GitHub Data Fetch</h1>

            <h2>Social Accounts</h2>
            <ul>
                {socialAccounts.map((account, index) => (
                    <li key={index}>
                        <strong>{account.provider}</strong>: <a href={account.url}>{account.url}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TestingComponent;