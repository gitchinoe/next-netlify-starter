import { useAnimation, AnimatePresence, motion } from "framer-motion";
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

export default function Header({ children }) {
  return (
    <header className="flex items-center justify-between py-4 mx-6">
      {children}
    </header>
  );
}

function Menu({ children }) {
  const [expand, setExpand] = useState(false);
  const [hamburgerClass, setHamburgerClass] = useState('bg-stone-900 w-full');
  const controls = useAnimation();

  const transition = {
    type: "tween",
    duration: .5,
    ease: [.59, -0.01, 0, 1],
  }

  function handleExpand(bool) {
    let bunColor = bool ? 'bg-white' : 'bg-stone-900';
    let bunWidth = bool ? 'w-1/2' : 'w-full';

    setHamburgerClass(`${bunColor} ${bunWidth}`);
    setExpand(bool);

    if (bool) {
      controls.start({
        rotateZ: 45,
        backgroundColor: "#f00",
        transition: transition,
      });
    } else {
      controls.stop();
    }
  }

  return (
    <>
      <button className={`h-2 w-8 relative z-50`} onClick={() => handleExpand(!expand)}>
        <motion.div
          className={`h-px absolute top-0 right-0 ${hamburgerClass}`}
          animate={controls}
          exit={{ backgroundColor: "#000", }}
        ></motion.div>
        <motion.div
          layout
          className={`h-px absolute bottom-0 right-0 ${hamburgerClass}`}
        ></motion.div>
      </button>

      <AnimatePresence>
        {expand && (
          <motion.div
            transition={transition}
            initial={{ x: "100%" }}
            animate={{ x: "0" }}
            exit={{ x: "100%" }}
            className="fixed inset-0 h-full w-full bg-stone-400"
          >
            <div className='flex flex-col h-full px-8 pt-20 pb-8 text-white justify-between'>
              {React.Children.map(children, (child) => {
                if (child.type === Nav) {
                  return (React.cloneElement(child, { 'setExpand': setExpand }));
                } else {
                  return child;
                }
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Nav({ children, setExpand }) {
  return (
    <ul className='flex flex-col gap-y-4'>
      {React.Children.map(children, (child, i) => (
        React.cloneElement(child, { i: i, setExpand: setExpand })
      ))}
    </ul>
  );
}

function Item({ href, text, i, setExpand }) {
  const router = useRouter();
  const isActive = router.asPath === href;
  const activeClass = isActive ? 'text-stone-300 pointer-events-none' : '';

  const itemAnimation = {
    visible: i => ({
      y: "0%",
      rotateZ: 0,
      transition: {
        delay: i * .2,
        ...itemTransition,
      }
    }),
    hidden: {
      y: "100%",
      rotateZ: 45,
      transition: {
        ...itemTransition,
      }
    }
  }
  const itemTransition = {
    type: "tween",
    duration: .5,
    ease: [.59, -0.01, 0, 1],
  }

  return (
    <li className={`overflow-hidden font-medium text-xl ${activeClass}`} onClick={() => setExpand(false)}>
      <Link href={href}>
        <motion.a
          custom={i}
          variants={itemAnimation}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="inline-block origin-bottom-left cursor-pointer"
        >
          {text}
        </motion.a>
      </Link>
    </li>
  );
}

function Brand({ text }) {
  return <h1 className='font-medium'>{text}</h1>;
}

function Socials({ children }) {
  return <ul className='flex flex-row gap-x-4'>{children}</ul>;
}

function Social({ href, text }) {
  return (
    <li className="underline">
      <Link href={href}>
        <a>{text}</a>
      </Link>
    </li>
  );
}

Header.Menu = Menu;
Header.Nav = Nav;
Header.Item = Item;
Header.Brand = Brand;
Header.Socials = Socials;
Header.Social = Social;