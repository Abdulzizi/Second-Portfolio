"use client"

import Link from "next/link";
import Image from "next/image";
import { getUserOrganizations } from "@/app/dataFetch";
import { useEffect, useState } from "react";

interface Organization {
  name: string;
  websiteUrl?: string;
  url: string;
  avatarUrl: string;
  description?: string;
}

interface ProfileOrganizationsProps {
  username: string;
}

const ProfileOrganizations: React.FC<ProfileOrganizationsProps> = ({ username }) => {
  const [organizations, setOrganizations] = useState<Organization[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const data = await getUserOrganizations(username);
        setOrganizations(data);
      } catch (err) {
        setError('Failed to fetch organizations.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrganizations();
  }, [username]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  if (!organizations || organizations.length === 0) {
    return <p>I Love Building Amazing Stuff 😁 but currently not affiliated with any organizations.</p>;
  }

  return (
    <p>
      I Love Building Amazing Stuff 😁{" "}
      at{" "}
      <span className="mt-3 overflow-hidden">
        {organizations.map((org, i, arr) => (
          <span key={org.name}>
            {i > 0 && (i < arr.length - 1 ? ', ' : ' and ')}
            <Link
              href={org.websiteUrl || org.url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline duration-500 hover:text-zinc-300"
            >
              <span className="text">{org.name}</span>
              <Image
                className="ms-1 inline-block rounded-md"
                src={org.avatarUrl}
                alt={org.name}
                title={[org.name, org.description].filter(Boolean).join(': ')}
                width={24}
                height={24}
              />
            </Link>
          </span>
        ))}
      </span>
    </p>
  );
};

export default ProfileOrganizations;
