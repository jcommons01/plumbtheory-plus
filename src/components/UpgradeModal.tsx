// ✅ src/components/UpgradeModal.tsx
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';

type UpgradeModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade: () => void;
};

const motivationalMessages = [
  "Unlock Your Full Potential with PlumbTheory+ Pro.",
  "Get Exam-Ready. Get Pro.",
  "Access Full Mock Exams and Professional References — Upgrade Today.",
  "Pass Faster. Learn Smarter. Go Pro.",
  "Take the Shortcut to Plumbing Success — Join PlumbTheory+ Pro.",
  "Everything You Need to Succeed — One Upgrade Away.",
];

export default function UpgradeModal({ isOpen, onClose, onUpgrade }: UpgradeModalProps) {
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      // Pick a random message each time the modal opens
      const randomMessage = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
      setMessage(randomMessage);
    }
  }, [isOpen]);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-30" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-2xl font-bold leading-6 text-blue-600 text-center mb-4"
                >
                  Upgrade to Pro
                </Dialog.Title>

                <div className="mt-2 mb-6 text-center">
                  <p className="text-gray-700 text-lg font-semibold">{message}</p>
                </div>

                <div className="mt-4 flex justify-center gap-4">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-green-600 px-6 py-2 text-sm font-medium text-white hover:bg-green-700 transition"
                    onClick={onUpgrade}
                  >
                    Upgrade Now
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-6 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
                    onClick={onClose}
                  >
                    Maybe Later
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
