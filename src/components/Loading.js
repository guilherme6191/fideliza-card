import React from 'react';
import LinearProgress from 'material-ui/LinearProgress';

export default function Loading() {
  return (
    <LinearProgress
      mode="indeterminate"
      // color="green"
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        zIndex: 9999,
        backgroundColor: '#fff'
      }}
    />
  );
}
