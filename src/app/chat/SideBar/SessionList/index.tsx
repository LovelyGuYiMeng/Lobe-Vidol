import { SearchBar } from '@lobehub/ui';
import { createStyles } from 'antd-style';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import SkeletonList from '@/components/SkeletonList';
import { HEADER_HEIGHT } from '@/constants/token';

import V from './Elsa';

const List = dynamic(() => import('./List'), {
  ssr: false,
  loading: () => <SkeletonList style={{ marginTop: 8 }} />,
});

const SessionCreateModal = dynamic(() => import('./SessionCreateModal'), {
  ssr: false,
});

const useStyles = createStyles(({ css, token, prefixCls }) => ({
  list: css`
    padding: 8px;
  `,
  container: css`
    .${prefixCls}-collapse-header {
      padding-inline: 8px !important;
      color: ${token.colorTextDescription} !important;
      border-radius: ${token.borderRadius}px !important;

      &:hover {
        color: ${token.colorText} !important;
        background: ${token.colorFillTertiary};
        .${prefixCls}-collapse-extra {
          display: block;
        }
      }
    }
    .${prefixCls}-collapse-extra {
      display: none;
    }
    .${prefixCls}-collapse-content {
      border-radius: 0 !important;
    }
    .${prefixCls}-collapse-content-box {
      padding: 0 !important;
    }
  `,
  icon: css`
    transition: all 100ms ${token.motionEaseOut};
  `,
}));

const SessionList = () => {
  const { styles } = useStyles();
  const [searchName, setSearchName] = useState<string>();
  const { t } = useTranslation('common');
  return (
    <>
      <Flexbox
        justify={'space-between'}
        horizontal
        align={'center'}
        style={{ height: HEADER_HEIGHT, padding: '8px 8px 0' }}
      >
        <SearchBar
          enableShortKey
          onChange={(e) => {
            setSearchName(e.target.value);
          }}
          placeholder={t('search')}
          shortKey="f"
          spotlight
          type={'block'}
          value={searchName}
        />
        <SessionCreateModal />
      </Flexbox>
      <div className={styles.list}>
        <V />
        <List filter={searchName} />
      </div>
    </>
  );
};

export default SessionList;
