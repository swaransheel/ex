import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Music, Pause } from 'lucide-react';

function FloatingHearts() {
  return (
    <div className="fixed inset-0 pointer-events-none">
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${15 + Math.random() * 10}s`
          }}
        >
          <div className="text-pink-400 opacity-70">❤️</div>
        </div>
      ))}
    </div>
  );
}

function InfoCard({ icon, title, subtitle }: { icon: React.ReactNode; title: string; subtitle: string }) {
  return (
    <div className="bg-white/90 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="flex flex-col items-center text-center gap-2">
        <div className="text-4xl mb-2 animate-bounce-slow">
          {icon}
        </div>
        <h3 className="text-pink-500 font-semibold text-lg">{title}</h3>
        <p className="text-purple-400 text-sm">{subtitle}</p>
      </div>
    </div>
  );
}

function App() {
  const [currentPage, setCurrentPage] = useState<
    'initial' | 'why-you' | 'why-me' | 'memories' | 'our-story' | 'songs'>('initial');
  const [currentAudio, setCurrentAudio] = useState<'background' | 'song1' | 'song2' | null>(null);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const song1Ref = useRef<HTMLAudioElement>(null);
  const song2Ref = useRef<HTMLAudioElement>(null);

  const handleAudioPlay = (audioType: 'background' | 'song1' | 'song2') => {
    // Pause all audios first
    [audioRef, song1Ref, song2Ref].forEach(ref => {
      if (ref.current) {
        ref.current.pause();
      }
    });

    const audioElement = {
      background: audioRef.current,
      song1: song1Ref.current,
      song2: song2Ref.current,
    }[audioType];

    if (audioElement) {
      if (currentAudio === audioType) {
        audioElement.pause();
        setCurrentAudio(null);
      } else {
        audioElement.play();
        setCurrentAudio(audioType);
      }
    }
  };

  useEffect(() => {
    const handleEnded = () => setCurrentAudio(null);
    const audios = [audioRef.current, song1Ref.current, song2Ref.current];

    audios.forEach(audio => {
      if (audio) audio.addEventListener('ended', handleEnded);
    });

    return () => {
      audios.forEach(audio => {
        if (audio) audio.removeEventListener('ended', handleEnded);
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 flex items-center justify-center p-4">
      <FloatingHearts />

      {/* Audio elements */}
      <audio ref={audioRef} src="/songs/background.mp3" loop />
      <audio ref={song1Ref} src="/songs/song1.mp3" />
      <audio ref={song2Ref} src="/songs/song2.mp3" />

      {currentPage === 'initial' && (
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl max-w-md w-full text-center relative overflow-hidden">
          <Sparkles className="absolute top-4 right-4 text-pink-400" />
          <Sparkles className="absolute top-4 left-4 text-pink-400" />

          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-6">
            Hey Madam Ji, Will You Be My Valentine?
          </h1>

          <p className="text-lg text-gray-600 mb-8">Let's go to park,enjoy sunset and have dinner at echoes...</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setCurrentPage('why-you')}
              className="px-6 py-3 bg-gradient-to-r from-pink-400 to-pink-500 text-white rounded-full font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              Yes, I'm Curious! 💝
            </button>

            <button
              onClick={() => handleAudioPlay('background')}
              className="px-6 py-3 bg-gradient-to-r from-purple-400 to-purple-500 text-white rounded-full font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              {currentAudio === 'background' ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Music className="w-4 h-4" />
              )}
              {currentAudio === 'background' ? 'Pause Music' : 'Play Music'}
            </button>
          </div>
        </div>
      )}

      {currentPage === 'why-you' && (
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl max-w-3xl w-full text-center relative overflow-hidden">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-8">
            Why Only You?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <InfoCard icon="☀️" title="Your Sunday Smile" subtitle="Makes my day shine" />
            <InfoCard icon="💖" title="Your Heart" subtitle="Your the Sweetest soul" />
            <InfoCard icon="🎵" title="Your Sweet Voice" subtitle="Perfect singing buddy" />
            <InfoCard icon="🥺" title="Your Goodness" subtitle="Your kind heart melts mine" />
            <InfoCard icon="✨" title="Your Eyes" subtitle="They speak volumes" />
            <InfoCard icon="💫" title="Everything About You" subtitle="Just perfect as you are" />
          </div>

          <button
            onClick={() => setCurrentPage('why-me')}
            className="px-6 py-3 bg-gradient-to-r from-pink-400 to-pink-500 text-white rounded-full font-medium hover:opacity-90 transition-opacity inline-flex items-center gap-2"
          >
            But Why Me? 🤔
          </button>
        </div>
      )}

      {currentPage === 'why-me' && (
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl max-w-3xl w-full text-center relative overflow-hidden">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-8">
            Why Only Me?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <InfoCard icon="🥰" title="I'm your kuchupuchu" subtitle="Best partner you could have!" />
            <InfoCard icon="🎵" title="My music taste is best" subtitle="I can sing all your favorite songs, i will try😁" />
            <InfoCard icon="😁" title="I'm never gonna stop irritating you" subtitle="em chestav , em cheyalev" />
            <InfoCard icon="💆🏻‍♀️" title="I will Take Care of you" subtitle="Like Always" />
            <InfoCard icon="👻" title="I will always torture you" subtitle="you have to bear it" />
            <InfoCard icon="🥺" title="I like watching you" subtitle="roju lo 24 hrs natho undu" />
          </div>

          <button
            onClick={() => setCurrentPage('memories')}
            className="px-6 py-3 bg-gradient-to-r from-pink-400 to-pink-500 text-white rounded-full font-medium hover:opacity-90 transition-opacity inline-flex items-center gap-2"
          >
            Let's Make Memories? ✨
          </button>
        </div>
      )}

      {currentPage === 'memories' && (
        <div 
          className="fixed inset-0 bg-black/30  flex items-center justify-center p-4 z-50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          onClick={() => setCurrentPage('why-me')}
        >
          <div 
            className="bg-white/90 rounded-2xl p-8 shadow-xl max-w-md w-full text-center relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-3xl font-bold text-pink-500 mb-6">Let's Make Memories</h2>
            <p className="text-gray-600 mb-4">
              So I've planned a magical day that I hope you will love. The best part is spending 
              time together and enjoying some delicious fried momos. 😉
            </p>
            <button 
              className="px-6 py-3 bg-gradient-to-r from-pink-400 to-purple-500 text-white rounded-full font-medium hover:opacity-90"
              onClick={() => setCurrentPage('our-story')}
            >
              Let's Go! 💕
            </button>
          </div>
        </div>
      )}

      {currentPage === 'our-story' && (
        <div 
          className="fixed inset-0 bg-black/30  flex items-start justify-center p-4 z-50 overflow-y-auto"
          onClick={() => setCurrentPage('memories')}
        >
          <div 
            className="bg-white/90  rounded-2xl p-8 shadow-xl max-w-3xl w-full text-center relative overflow-hidden my-8"
            onClick={(e) => e.stopPropagation()}
            style={{ minHeight: '80vh' }}
          >
            <Sparkles className="absolute top-4 right-4 text-pink-400" />
            <Sparkles className="absolute top-4 left-4 text-pink-400" />
            
            <h2 className="text-3xl font-bold mb-8 text-center">
              📖{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
                Our Story Timeline
              </span>
            </h2>
            <div className="bg-gradient-to-r from-[#e773a3] to-pink-100 rounded-lg p-6 mb-8">
              <div className="relative px-4 sm:px-8 py-6">
                <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-pink-200 transform -translate-x-1/2" />

                <div className="space-y-1">
                  <div className="relative flex justify-between items-center w-full">
                    <div className="w-5/12">
                      <InfoCard
                        icon="🌟"
                        title="First Message"
                        subtitle="You texted me first with that cute 'Hi'"
                      />
                    </div>
                    <div className="w-1/12 flex justify-center">
                      <div className="w-6 h-6 rounded-full bg-pink-500 border-4 border-white shadow-lg" />
                    </div>
                    <div className="w-5/12" />
                  </div>

                  <div className="relative flex justify-between items-center w-full">
                    <div className="w-5/12" />
                    <div className="w-1/12 flex justify-center">
                      <div className="w-6 h-6 rounded-full bg-pink-500 border-4 border-white shadow-lg" />
                    </div>
                    <div className="w-5/12">
                      <InfoCard
                        icon="💌"
                        title="We talked"
                        subtitle="We started talking and the connection was instant"
                      />
                    </div>
                  </div>

                  <div className="relative flex justify-between items-center w-full">
                    <div className="w-5/12">
                      <InfoCard
                        icon="🤗"
                        title="Daily Talks"
                        subtitle="Our conversations became the highlight of every day"
                      />
                    </div>
                    <div className="w-1/12 flex justify-center">
                      <div className="w-6 h-6 rounded-full bg-pink-500 border-4 border-white shadow-lg" />
                    </div>
                    <div className="w-5/12" />
                  </div>

                  <div className="relative flex justify-between items-center w-full">
                    <div className="w-5/12" />
                    <div className="w-1/12 flex justify-center">
                      <div className="w-6 h-6 rounded-full bg-pink-500 border-4 border-white shadow-lg" />
                    </div>
                    <div className="w-5/12">
                      <InfoCard
                        icon="💖"
                        title="Special Bond"
                        subtitle="Realized we had something truly unique"
                      />
                    </div>
                  </div>

                  <div className="relative flex justify-between items-center w-full">
                    <div className="w-5/12">
                      <InfoCard
                        icon="✨"
                        title="To be continued... "
                        subtitle="Our story is just beginning"
                      />
                    </div>
                    <div className="w-1/12 flex justify-center">
                      <div className="w-6 h-6 rounded-full bg-pink-500 border-4 border-white shadow-lg" />
                    </div>
                    <div className="w-5/12" />
                  </div>
                </div>
              </div>
              </div>
              <div className="text-center">
              <button
                className="mt-8 px-6 py-3 bg-gradient-to-r from-purple-400 to-pink-500 text-white rounded-full font-medium hover:opacity-90"
                onClick={() => setCurrentPage('songs')}
              >
                I have dedicated some songs for you!    🎶
              </button>
              </div>
          </div>
        </div>
      )}

{currentPage === 'songs' && (
  <div 
    className="fixed inset-0 bg-black/30 flex items-center justify-center p-4 z-50"
    onClick={() => setCurrentPage('our-story')}
  >
    <div 
      className="bg-white/90 rounded-2xl p-8 shadow-xl max-w-3xl w-full text-center relative overflow-hidden"
      onClick={(e) => e.stopPropagation()}
    >
      <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF0080] to-pink-500 mb-8">
        Songs For You 💗
      </h2>

      {/* Current Playing Song Info Card - placed above the song cards */}
      {currentAudio && (
        <div className="bg-[#e1e7db] p-6 rounded-2xl  max-w-md w-full mb-8 mx-auto shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center justify-center mt-2">
            {currentAudio === 'song1' ? (
              <img src="/song1-image-url.jpg" alt="Apna Bana Le" className="w-20 h-20 object-cover rounded-full mr-4" />
            ) : (
              <img src="/song2-image-url.jpg" alt="Raabta" className="w-20 h-20 object-cover rounded-full mr-4" />
            )}
            <p className="text-center font-thin text-sm text-gray-600">
              {currentAudio === 'song1' ? 'Currently playing Apna Bana Le' : 'Currently playing Raabta'}
            </p>
          </div>
        </div>
      )}

      {/* Song Cards */}
      <div className="flex flex-col md:flex-row gap-6 justify-center">
        <div className="flex-1 bg-[#e3ccf8] rounded-lg p-6 min-w-[300px] shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="flex flex-col items-center">
            <h3 className="text-xl font-semibold text-pink-600 mb-2">Apna Bana Le</h3>
            <p className="text-purple-500 mb-4">by Arijit Singh</p>
            <button 
              onClick={() => handleAudioPlay('song1')}
              className="px-6 py-2 bg-pink-500 text-white rounded-full flex items-center gap-2 hover:bg-pink-600 transition-colors"
            >
              {currentAudio === 'song1' ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Music className="w-4 h-4" />
              )}
              {currentAudio === 'song1' ? 'Pause' : 'Play'}
            </button>
          </div>
        </div>

        <div className="flex-1 bg-[#ecd3e0] rounded-lg p-6 min-w-[300px] shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="flex flex-col items-center">
            <h3 className="text-xl font-semibold text-purple-600 mb-2">Raabta</h3>
            <p className="text-pink-500 mb-4">by Arijit Singh</p>
            <button 
              onClick={() => handleAudioPlay('song2')}
              className="px-6 py-2 bg-purple-500 text-white rounded-full flex items-center gap-2 hover:bg-purple-600 transition-colors"
            >
              {currentAudio === 'song2' ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Music className="w-4 h-4" />
              )}
              {currentAudio === 'song2' ? 'Pause' : 'Play'}
            </button>
          </div>
        </div>
      </div>

      <p className="mt-8 text-gray-600 text-sm">
        Made with ❤️ For You!
      </p>
    </div>
  </div>
)}

    </div>
  );
}

export default App;