const Server = require('bittorrent-tracker').Server;

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log(`🚀 Tracker running on port ${PORT}`));

const server = new Server({
  udp: false,      // Disable UDP (browsers can't use it)
  http: false,     // We only need WebSocket
  ws: true,        // Enable WebSocket
  stats: true,     // Enable stats endpoint
  filter: function (infoHash, params, cb) {
    // Optional: Add filtering logic here
    // For now, accept all
    cb(null);
  }
});

// Handle errors
server.on('error', function (err) {
  console.error('Tracker error:', err.message);
});

server.on('warning', function (err) {
  console.warn('Tracker warning:', err.message);
});

server.on('listening', function () {
  console.log('✅ WebTorrent tracker running!');
  console.log(`   Port: ${PORT}`);
  console.log(`   WebSocket: ws://localhost:${PORT}`);
  console.log(`   Stats: http://localhost:${PORT}/stats`);
});

// Start server
server.listen(PORT, () => {
  console.log('🚀 Tracker server starting...');
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('📴 Shutting down gracefully...');
  server.close(() => {
    console.log('👋 Tracker stopped');
    process.exit(0);
  });
});
