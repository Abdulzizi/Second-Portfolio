import { MarkGithubIcon, MailIcon, PersonIcon, LinkIcon } from '@primer/octicons-react';
import Link from "next/link";
import { Navigation } from "../../components/nav";
import Card from "../../components/card";
import data from "@/app/personalData.json";
import { getUser, getSocialAccounts } from "@/app/dataFetch";

interface Contact {
    icon: JSX.Element;
    href: string;
    label: string;
    handle: string;
}

interface Activity {
    url: string;
    provider: string;
}

export default async function Contacts() {
    const username = process.env.GITHUB_USERNAME || data.githubUsername;

    // Handle asynchronous data fetching
    const [user, githubSocials] = await Promise.all([
        getUser(username),
        getSocialAccounts(username)
    ]);

    const email = user.email || data.email;
    const contact: Contact[] = [];

    if (email) {
        contact.push({
            icon: <MailIcon size={20} />,
            href: `mailto:${email}`,
            label: "Email",
            handle: email,
        });
    }

    contact.push({
        icon: <MarkGithubIcon size={20} />,
        href: `https://github.com/${username}`,
        label: "Github",
        handle: username,
    });

    // Type assertion ensures githubSocials is treated as an array of Activity
    const socials: Activity[] = githubSocials as Activity[];

    if (Array.isArray(socials)) {
        socials.forEach((activity: Activity) => {
            // Ensure both url and provider exist before using them
            if (activity.url && activity.provider) {
                const handle = activity.url.split("/").pop() || '';
                const label = activity.provider === "linkedin" ? activity.provider : activity.url.split("/")[2];

                contact.push({
                    icon: activity.provider === "linkedin" ? <LinkIcon size={20} /> : <PersonIcon size={20} />,
                    href: activity.url,
                    label,
                    handle,
                });
            }
        });
    } else {
        console.error("Expected githubSocials to be an array of Activity objects.");
    }

    return (
        <div className="bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0">
            <Navigation />
            <div className="container flex items-center justify-center min-h-screen px-4 mx-auto">
                <div className="grid w-full grid-cols-1 gap-8 mx-auto mt-32 sm:mt-0 sm:grid-cols-3 lg:gap-16">
                    {contact.map((s) => {
                        const emailTransform = s.label === 'Email' ? 'sm:rotate-45 md:rotate-0 lg:rotate-45 xl:rotate-0' : '';

                        return (
                            <Card key={s.label}>
                                <Link
                                    href={s.href}
                                    target="_blank"
                                    className="p-4 relative flex flex-col items-center gap-4 duration-700 group md:gap-8 md:py-24 lg:pb-48 md:p-16 sm:p-8"
                                >
                                    <span
                                        className="absolute w-px h-2/3 bg-gradient-to-b from-zinc-500 via-zinc-500/50 to-transparent"
                                        aria-hidden="true"
                                    />
                                    <span className="relative z-10 flex items-center justify-center w-12 h-12 text-sm duration-1000 border rounded-full text-zinc-200 group-hover:text-white group-hover:bg-zinc-900 border-zinc-500 bg-zinc-900 group-hover:border-zinc-200 drop-shadow-orange">
                                        {s.icon}
                                    </span>
                                    <div className="z-10 flex flex-col items-center">
                                        <span className={`whitespace-nowrap text-xl font-medium duration-150 lg:text-3xl text-zinc-200 group-hover:text-white font-display ${emailTransform}`}>
                                            {s.handle}
                                        </span>
                                        <span className="mt-4 text-sm text-center duration-1000 text-zinc-400 group-hover:text-zinc-200">
                                            {s.label}
                                        </span>
                                    </div>
                                </Link>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}