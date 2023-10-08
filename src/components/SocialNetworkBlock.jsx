'use client';

import Image from 'next/image';
import styles from '../styles/SocialNetworkBlock.module.css';

const SocialNetworkBlock = () => {
  return (
    <div className={styles.socialIcon}>
      <a
        href={process.env.NEXT_PUBLIC_LINK_GITHUB}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          src="/icon-github.svg"
          alt="GITHUB"
          width="0"
          height="0"
          sizes="100vw"
          style={{
            width: 'auto',
            height: 'auto'
          }}
        />
      </a>
      <a
        href={process.env.NEXT_PUBLIC_LINK_LINKEDIN}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          src="/icon-linkedin.svg"
          alt="LINKEDIN"
          width="0"
          height="0"
          sizes="100vw"
          style={{
            width: 'auto',
            height: 'auto'
          }}
        />
      </a>
      <a
        href={process.env.NEXT_PUBLIC_LINK_FACEBOOK}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          src="/icon-facebook.svg"
          alt="FACEBOOK"
          width="0"
          height="0"
          sizes="100vw"
          style={{
            width: 'auto',
            height: 'auto'
          }}
        />
      </a>
      <a
        href={process.env.NEXT_PUBLIC_LINK_INSTAGRAM}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          src="/icon-instagram.svg"
          alt="INSTAGRAM"
          width="0"
          height="0"
          sizes="100vw"
          style={{
            width: 'auto',
            height: 'auto'
          }}
        />
      </a>
    </div>
  );
};

export default SocialNetworkBlock;
