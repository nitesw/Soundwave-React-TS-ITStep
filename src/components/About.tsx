import { Button, Row, Col, Typography, Divider, message } from "antd";

const { Title, Paragraph } = Typography;

const About = () => {
  return (
    <>
      <Title level={1}>About Us</Title>

      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Title level={2}>Welcome to Soundwave</Title>
          <Paragraph>
            Welcome to <strong>Soundwave</strong>, a platform for music lovers
            to explore, stream, and share music with ease. Inspired by the best
            features of music platforms like SoundCloud, Soundwave offers a
            fresh and unique way to enjoy your favorite tracks and discover new
            ones.
          </Paragraph>
        </Col>

        <Col span={24}>
          <Title level={3}>What is Soundwave?</Title>
          <Paragraph>
            Soundwave is a modern <strong>music streaming platform</strong>{" "}
            designed with both music fans and creators in mind. Whether you're
            looking to listen to your favorite tunes, create custom playlists,
            or even upload your own tracks, Soundwave provides a seamless,
            interactive experience for everyone.
          </Paragraph>
        </Col>

        <Col span={24}>
          <Title level={3}>Inspired by SoundCloud</Title>
          <Paragraph>
            We took inspiration from <strong>SoundCloud</strong>—one of the most
            popular platforms for music sharing and discovery—but we wanted to
            build something that offered a more tailored and flexible
            experience. Soundwave blends the simplicity and social aspects that
            SoundCloud is known for with features that cater to creators who
            want to manage and grow their content.
          </Paragraph>
        </Col>

        <Col span={24}>
          <Title level={3}>Key Features:</Title>
          <ul>
            <li>
              <strong>Track Streaming:</strong> Listen to a vast library of
              music from artists around the world, from mainstream hits to
              underground gems.
            </li>
            <li>
              <strong>Playlist Creation:</strong> Organize your favorite tracks
              into personalized playlists, and share them with your friends.
            </li>
            <li>
              <strong>User Profiles:</strong> Create and customize your profile,
              showcase your music taste, and engage with the community.
            </li>
            <li>
              <strong>Pro User Features:</strong> Upgrade to Pro and take
              control of your content! As a Pro user, you can upload, edit, and
              delete your tracks, all while managing your profile and audience.
            </li>
          </ul>
        </Col>

        <Col span={24}>
          <Title level={3}>What Sets Us Apart?</Title>
          <Paragraph>
            While Soundwave offers the same great music discovery and streaming
            experience that you love from SoundCloud, we aim to go a step
            further by offering greater control to our users. If you're an
            aspiring artist or a passionate creator, the <strong>Pro</strong>{" "}
            account gives you access to a range of powerful tools to upload,
            edit, and delete your own music. Whether you're a listener or an
            artist, Soundwave gives you the freedom to shape your experience.
          </Paragraph>
        </Col>

        <Col span={24}>
          <Title level={3}>A Personal Project</Title>
          <Paragraph>
            Soundwave is a personal project built from the ground up with love
            and care. What began as a simple exam project has evolved into
            something I’m passionate about and plan to continue developing.
            While it’s still a work in progress, it’s a project that I hope to
            feature in my portfolio and share with the world.
          </Paragraph>
        </Col>

        <Col span={24}>
          <Title level={3}>Future Plans & Goals</Title>
          <Paragraph>
            The vision for Soundwave doesn’t stop here. I have exciting plans to
            continually improve the platform, adding more features, such as
            advanced artist tools, collaboration features, and expanded music
            discovery. I want Soundwave to become a platform where artists and
            listeners can truly connect and grow together.
          </Paragraph>
        </Col>

        <Col span={24}>
          <Title level={3}>Upgrade to Pro</Title>
          <Paragraph>
            Want to do more with Soundwave? <strong>Upgrade to Pro</strong> to
            unlock exclusive features, including the ability to upload your own
            tracks, manage your music, and share your creations with the world.
            Whether you’re an artist or just want to access advanced features,
            going Pro is the best way to elevate your Soundwave experience.
          </Paragraph>
          <Button
            type="primary"
            size="large"
            onClick={() => message.info("Pro Upgrade Coming Soon!")}
          >
            Upgrade to Pro
          </Button>
        </Col>

        <Col span={24}>
          <Divider />
          <Title level={3}>Contact Us</Title>
          <Paragraph>
            Have any questions or feedback? Feel free to reach out to us! We’d
            love to hear from you. Stay tuned for updates, and thank you for
            choosing Soundwave as your new music streaming home.
          </Paragraph>
        </Col>
      </Row>
    </>
  );
};

export default About;
