import { cache } from "react";

// const revalidate = 60;
// const MINUTES_5 = 60 * 5;
// const HOURS_1 = 60 * 60;
// const HOURS_12 = 60 * 60 * 12;

const API_BASE_URL = "https://api.github.com";
// const VERCEL_API_URL = "https://api.vercel.com/v9/projects";

interface ActivityPayload {
  size?: number;
  action?: string;
  ref_type?: string;
  pull_request?: {
    merged?: boolean;
  };
}

interface Activity {
  type: string;
  payload: ActivityPayload;
}


const fetchFromGitHub = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = {
    "Authorization": `Bearer ${process.env.NEXT_PUBLIC_GH_TOKEN}`, 
    ...options.headers,
  };

  try {
    const response = await fetch(url, { ...options, headers });
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
    throw error;
  }
};

export async function getUser(username: string) {
  console.log("Fetching user data for", username);
  console.time("getUser");
  const data = await fetchFromGitHub(`/users/${username}`);
  console.timeEnd("getUser");
  return data;
}

export const getUserOrganizations = async (username: string) => {
  console.log("Fetching organizations for", username);
  console.time("getUserOrganizations");
  const query = `{user(login: "${username}") {organizations(first: 6) {nodes {name, websiteUrl, url, avatarUrl, description}}}}`;
  const data = await fetchFromGitHub("/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.NEXT_PUBLIC_GH_TOKEN}`,
    },
    body: JSON.stringify({ query }),
  });
  console.timeEnd("getUserOrganizations");
  return data.data.user.organizations.nodes;
};

export const getRecentUserActivity = cache(async (username: string): Promise<Activity[]> => {
  console.log("Fetching recent activity for", username);
  console.time("getRecentUserActivity");

  const res = await fetch(`https://api.github.com/users/${username}/events`, {
    headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_GH_TOKEN}` },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch data: ${res.statusText}`);
  }

  const response: Activity[] = await res.json();
  console.timeEnd("getRecentUserActivity");
  return response;
});