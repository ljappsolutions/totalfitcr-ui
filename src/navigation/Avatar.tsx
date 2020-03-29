import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import * as React from 'react';

interface IImageAvatarsProps {
  onClick: any;
  url?: string;
}

class ImageAvatars extends React.Component<IImageAvatarsProps> {
  public render() {
    const { url } = this.props;
    const avatarUrl = url
      ? url
      : 'https://image.flaticon.com/icons/svg/53/53119.svg';

    return (
      <Grid
        container={true}
        direction="row"
        justify="flex-end"
        alignItems="center"
      >
        <Grid item={true} xs={12} sm={2}>
          <Avatar alt="Avatar" src={avatarUrl} onClick={this.props.onClick} />
        </Grid>
      </Grid>
    );
  }
}

export default ImageAvatars;
