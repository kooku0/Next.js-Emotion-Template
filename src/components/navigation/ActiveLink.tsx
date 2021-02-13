/* eslint-disable react/destructuring-assignment */
import React, { Children, DetailedReactHTMLElement } from 'react';
import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';

const ACTIVE_CLASSNAME = 'active';

const ActiveLink: React.FC<LinkProps> = ({ children, ...props }) => {
  const { asPath } = useRouter();
  const child = Children.only(children) as DetailedReactHTMLElement<any, any>;

  const className = asPath.startsWith(props.href.toString()) ? ACTIVE_CLASSNAME : '';

  return (
    <Link {...props}>
      {React.cloneElement(child, {
        className
      })}
    </Link>
  );
};

export default ActiveLink;
