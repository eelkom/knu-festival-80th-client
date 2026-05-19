import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import MemberCard from './MemberCard';
import type { Member } from './MemberCard';

export type RoleSection = {
  id: string;
  label: string;
  icon: ReactNode;
  members: Member[];
};

export default function RoleSectionBlock({ role }: { role: RoleSection }) {
  return (
    <section className="flex flex-col gap-5 px-5 pt-7 pb-7">
      <div className="flex items-center gap-2.5">
        <div className="flex size-[35px] shrink-0 items-center justify-center rounded-full bg-primary">
          {role.icon}
        </div>
        <h2 className="text-[24px] font-bold leading-none tracking-[-0.48px] text-text">
          {role.label}
        </h2>
      </div>
      <motion.ul
        className="flex flex-wrap gap-2.5"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
      >
        {role.members.map((member) => (
          <motion.li
            key={member.name}
            className="w-[calc(50%-5px)]"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
            }}
          >
            <MemberCard member={member} />
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}
