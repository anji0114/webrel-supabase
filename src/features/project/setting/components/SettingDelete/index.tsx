'use client';

import { FC } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ProjectDeleteModal } from '@/features/project/setting/components/ProjectDeleteModal';
import { useDeleteProject } from '@/features/project/setting/hooks/useDeleteProject';
import { useVisible } from '@/hooks/useVisible';

type TSettingDeleteProps = {
  projectId: string;
};

export const SettingDelete: FC<TSettingDeleteProps> = ({ projectId }) => {
  const { deleteProject, isLoading } = useDeleteProject();
  const { visible, setVisibleTrue, setVisibleFalse } = useVisible(false);

  return (
    <>
      <Card>
        <h2 className='text-xl leading-tight text-danger font-bold'>
          プロジェクトの削除
        </h2>
        <p className='mt-6'>
          プロジェクトを削除すると、登録した情報は全て削除されます。
          <br />
          このアクションは元に戻すことができませんのでご注意ください。
        </p>
        <div className='mt-6'>
          <Button onClick={setVisibleTrue} size='sm' color='grayRed'>
            プロジェクトを削除する
          </Button>
        </div>
      </Card>
      <ProjectDeleteModal
        open={visible}
        onCancel={setVisibleFalse}
        isLoading={isLoading}
        onOk={() => {
          deleteProject(projectId);
        }}
      />
    </>
  );
};