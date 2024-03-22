import React from "react";
import {ILeaderCard} from "@src/components/LeaderCard/types";
import Image from "next/image";
import { clsx } from "clsx";
import styles from "./leader-card.module.scss";

const LeaderCard: React.FC<ILeaderCard> = (props) => {
    return (
        <div className="flex flex-col relative">
            <div className="absolute h-14 w-14 -left-10 top-0">
                <a href={props.in} className="mx-2" target="_blank"><span className="text-orange text-2xl md:text-lg">in</span></a>
            </div>
            <div className="bg-gray-30">
                <div className={clsx(`${styles['leader-card_img-container']} bg-gray-20`)}>
                    <Image src={props.avatar} alt={props.fullName} fill style={{ objectFit:"cover" }} />
                </div>
            </div>
            <div className="text-white flex flex-col gap-2 my-3 px-0.5">
                <span className="text-orange">{props.fullName}</span>
                <span>{props.position.join(', ')}</span>
            </div>
        </div>
    );
}

export default LeaderCard;
