import React from "react";
import { getRecentUserActivity } from "@/app/dataFetch";

// Define types for activity payload and activity data
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

interface RecentActivityProps {
  username: string;
}

export const RecentActivity: React.FC<RecentActivityProps> = async ({ username }) => {
  // Fetch recent user activity
  const recentUserActivity: Activity[] = await getRecentUserActivity(username);

  // Summarize the activity
  const activitySummary = recentUserActivity.reduce((acc: any, activity: Activity) => {
    if (activity.type === 'PushEvent') {
      acc.commits = acc.commits || 0;
      acc.commits += activity.payload.size || 0;
    } else if (activity.type === 'PullRequestReviewEvent') {
      acc.reviews = acc.reviews || 0;
      acc.reviews++;
    } else if (activity.type === 'IssueCommentEvent') {
      acc.commentsCreated = acc.commentsCreated || 0;
      acc.commentsCreated += activity.payload.action === 'created' ? 1 : 0;
      acc.commentsEdited = acc.commentsEdited || 0;
      acc.commentsEdited += activity.payload.action === 'edited' ? 1 : 0;
    } else if (activity.type === 'PullRequestEvent') {
      acc.prsOpened = acc.prsOpened || 0;
      acc.prsOpened += activity.payload.action === 'opened' ? 1 : 0;
      acc.prsMerged = acc.prsMerged || 0;
      acc.prsMerged += activity.payload.action === 'closed' && activity.payload.pull_request?.merged ? 1 : 0;
    } else if (activity.type === 'CreateEvent') {
      if (activity.payload.ref_type === 'tag') {
        acc.tags = acc.tags || 0;
        acc.tags++;
      } else {
        acc.branches = acc.branches || 0;
        acc.branches++;
      }
    }

    acc[activity.type] = acc[activity.type] || 0;
    acc[activity.type]++;

    return acc;
  }, {});

  // Generate activity summary string
  const activitySummaryString = Object.keys(activitySummary).map((key) => {
    const value = activitySummary[key];
    if (key === 'commits' && value) {
      return `pushed ${value} commit${value === 1 ? '' : 's'}`;
    } else if (key === 'reviews' && value) {
      return `reviewed ${value} PR${value === 1 ? '' : 's'}`;
    } else if (key === 'prsOpened' && value) {
      return `opened ${value} PR${value === 1 ? '' : 's'}`;
    } else if (key === 'prsMerged' && value) {
      return `merged ${value} PR${value === 1 ? '' : 's'}`;
    } else if (key === 'commentsCreated' && value) {
      return `made ${value} comment${value === 1 ? '' : 's'}`;
    } else if (key === 'branches' && value) {
      return `created ${value} branch${value === 1 ? '' : 'es'}`;
    } else if (key === 'tags' && value) {
      return `created ${value} tag${value === 1 ? '' : 's'}`;
    } else {
      return null;
    }
  }).filter(Boolean).join(', ');

  return (
    <div>
      <span className="text-sm">
        {activitySummaryString && `In the last 90 days on GitHub I ${activitySummaryString} in public repositories.`}
      </span>
    </div>
  );
};
