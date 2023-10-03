'use client';

import { signOut } from 'next-auth/react';
import { FC } from 'react';
import { TDashboardProject } from '../DashboardProject';
import { DashboardProjects } from '../DashboardProjects';
import { Button } from '@/components/Button';

const PROJECTS: TDashboardProject[] = [
  {
    id: '1',
    title: 'Webrel',
    description:
      '🎨 全体的にリファクタリングをしました。次の作業は機能実装をしていこうと思います',
    updatedAt: '2023.01.13',
  },
  {
    id: '2',
    title: 'GitFiles',
    description: 'GitHubでfileごとに管理するアプリです。',
    updatedAt: '2022.01.11',
  },
  {
    id: '3',
    title: 'GahterNote',
    description:
      '🎨 全体的にリファクタリングをしました。次の作業は機能実装をしていこうと思いました。あと開業のチェック',
    updatedAt: '2022.01.11',
  },
  {
    id: '4',
    title: 'GahterNote',
    description:
      '🎨 全体的にリファクタリングをしました。次の作業は機能実装をしていこうと思いました。あと開業のチェック',
    updatedAt: '2022.01.11',
  },
];

export const DashboardContent: FC = () => {
  return (
    <div>
      <Button size='sm' onClick={() => signOut()} variable color='dark'>
        新規プロジェクト
      </Button>
      <div className='mt-6'>
        <DashboardProjects title='ANJI TANAKA' projects={PROJECTS} />
        <hr className='border-t border-gray-400 -mx-8 my-10' />
        <DashboardProjects title='参加中のプロジェクト' projects={PROJECTS} />
      </div>
    </div>
  );
};