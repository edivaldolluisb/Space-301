import { Launch, OrganizedLaunches } from "@/components/types";

export const organizeLaunches = (launches: Launch[]): OrganizedLaunches => {
    return launches.reduce((acc, launch) => {
        const date = new Date(launch.launchDate);
        const year = date.getFullYear().toString();
        const month = date.toLocaleString('default', { month: 'short' });

        if (!acc[year]) acc[year] = {};
        if (!acc[year][month]) acc[year][month] = [];

        acc[year][month].push(launch);
        return acc;
    }, {} as OrganizedLaunches);
};