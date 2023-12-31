import { XMarkIcon } from '@heroicons/react/24/outline';
import * as RadixToast from '@radix-ui/react-toast';
import clsx from 'clsx';
import { FC, PropsWithChildren } from 'react';

type TToastProps = PropsWithChildren & {
  status?: 'default' | 'success' | 'error';
  open: boolean;
  setOpen: (visible: boolean) => void;
};

export const Toast: FC<TToastProps> = ({
  status = 'default',
  open,
  setOpen,
  children,
}) => {
  return (
    <RadixToast.Provider>
      <RadixToast.Root
        className='fixed z-50 bottom-5 right-5 pl-6 pr-10 pt-[26px] pb-6 w-[300px] bg-white border border-gray-100 shadow-md rounded-lg '
        open={open}
        onOpenChange={setOpen}
        duration={5000}
      >
        <RadixToast.Description
          className={clsx(
            { ['text-red-600']: status === 'error' },
            { ['text-green-600']: status === 'success' },
          )}
        >
          {children}
        </RadixToast.Description>
        <RadixToast.Close asChild>
          <button
            className='absolute top-3 right-3 w-4 h-4 text-gray-600 hover:text-gray-900'
            onClick={() => {
              setOpen(false);
            }}
          >
            <XMarkIcon />
          </button>
        </RadixToast.Close>
      </RadixToast.Root>
      <RadixToast.Viewport className='ToastViewport' />
    </RadixToast.Provider>
  );
};
