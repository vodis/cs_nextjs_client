import React from 'react';
import Image from 'next/image';
import { clsx } from 'clsx';

import { ILeaderCard } from '@src/components/LeaderCard/types';

import styles from './leader-card.module.scss';

const LeaderCard: React.FC<ILeaderCard> = (props) => {
  return (
    <div className="flex flex-col relative">
      {props.in ? (
        <div className="absolute h-14 w-14 -left-10 top-0">
          <a href={props.in} className="mx-2" target="_blank" rel="noreferrer">
            <span className="text-orange text-2xl md:text-lg">in</span>
          </a>
        </div>
      ) : null}
      <div className="bg-gray-30">
        <div
          className={clsx(`${styles['leader-card_img-container']} bg-gray-20`)}
        >
          <Image
            src={props.avatar}
            alt={props.fullName}
            fill
            className="grayscale brightness-100"
            style={{ objectFit: 'cover' }}
          />
        </div>
      </div>
      <div className="text-white flex flex-col gap-2 my-3 px-0.5">
        <span className="text-orange text-xl">{props.fullName}</span>
        <span className="text-xl">{props.position.join(', ')}</span>
      </div>
    </div>
  );
};

export default LeaderCard;
