import {
  XMarkIcon,
  ArrowTopRightOnSquareIcon,
  HandThumbUpIcon,
  ChatBubbleLeftIcon,
  SpeakerWaveIcon
} from '@heroicons/react/24/outline';

interface NewsDetailPanelProps {
  onClose: () => void;
}

export function NewsDetailPanel({ onClose }: NewsDetailPanelProps) {
  return (
    <div className="h-full w-full bg-white overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-sm border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center">
            <span className="text-white text-sm font-bold">=</span>
          </div>
          <span className="text-sm font-medium text-gray-700">ZenCore unveils adaptive weave breakthrough...</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
            <ArrowTopRightOnSquareIcon className="w-4 h-4" />
            <span>Open in SharePoint</span>
          </button>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <XMarkIcon className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        {/* Main Card */}
        <div className="bg-gradient-to-b from-purple-300 via-pink-200 to-orange-200 rounded-3xl p-8 mb-6">
          {/* Author Info */}
          <div className="flex items-center gap-2 mb-6">
            <div className="flex items-center gap-2 bg-white/40 backdrop-blur-sm rounded-full px-3 py-1">
              <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">Z</span>
              </div>
              <span className="text-sm font-medium text-gray-800">Curated by ZenCore · 7hrs ago</span>
            </div>
          </div>

          {/* Featured Image */}
          <div className="mb-6">
            <img
              src="/post-image.png"
              alt="Textile innovation showcase"
              className="w-full h-auto object-cover rounded-2xl"
            />
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            RTO is the most-asked topic ahead of the AMA
          </h1>

          {/* Intro Paragraphs */}
          <div className="space-y-4 text-gray-800 mb-6">
            <p className="leading-relaxed">
              ZenCore has introduced <strong>HelixWeave™</strong>, a next-gen textile architecture that
              dynamically shifts under impact and relaxes during recovery, enabling smart fibers to sense
              how performance fabrics respond in motion.
            </p>
            <p className="leading-relaxed">
              What's new: Built with embedded micro-responsive fibers, the material senses temperature
              shifts, muscle exertion, and directional force in real time.
            </p>
            <p className="leading-relaxed">
              Why it matters: From elite athletics to industrial safety gear, adaptive textiles could reduce
              fatigue, improve recovery cycles, and enhance durability under repeated stress.
            </p>
          </div>

          {/* Engagement Bar */}
          <div className="flex items-center gap-6 pt-4 border-t border-gray-900/10">
            <button className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900">
              <HandThumbUpIcon className="w-5 h-5" />
              <span>45</span>
            </button>
            <button className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900">
              <ChatBubbleLeftIcon className="w-5 h-5" />
              <span>27</span>
            </button>
            <button className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900 ml-auto">
              <SpeakerWaveIcon className="w-5 h-5" />
              <span>Listen as podcast</span>
            </button>
          </div>
        </div>

        {/* Article Body */}
        <div className="bg-white rounded-3xl p-8 space-y-8">
          {/* Section: Performance Trends */}
          <section>
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">ZenCore Fiber v2 brief</p>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Performance Trends and Product Impact
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Since the launch of ZenCore Fiber v2 in mid-May 2026, pilot program feedback has surged by 52%,
              signaling strong early traction but also surfacing critical concerns. While adoption momentum
              remains high, field testing revealed durability and adaptive-response variability in high-exertion
              environments.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Quantitative metrics show a 29% increase in high-load stress reports during extreme endurance
              simulations compared to baseline fabric models, indicating opportunities for sustained recalibration
              under sustained strain.
            </p>
          </section>

          {/* Comparison Section */}
          <section className="bg-gray-50 rounded-2xl p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="text-blue-600">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-2h2v2zm0-4H9V5h2v4z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 mb-2">Adaptive Textile Performance Comparison</h3>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 leading-relaxed mb-3">
                      Includes lab stress data, environmental simulations, biomechanical mapping, and partner
                      feedback summaries. Useful for evaluating durability benchmarks and response consistency
                      across use cases.
                    </p>
                  </div>
                  <img
                    src="/news-2.png"
                    alt="Textile comparison"
                    className="w-32 h-24 object-cover rounded-xl"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Key Themes */}
          <section>
            <p className="text-gray-700 leading-relaxed mb-4">
              Three dominant themes have emerged across pilot programs and validation tests:
            </p>
            <ul className="space-y-3 ml-6">
              <li className="text-gray-700">
                <strong>Dynamic tension lag</strong> was observed in 34% of high-exertion trials in humid
                athletics testing, often manifesting during rapid directional shifts in heat endurance testing.
              </li>
              <li className="text-gray-700">
                <strong>Thermal response inconsistency</strong> in extended heat exposure scenarios, prompting
                recalibration of fabric-responsive fibers.
              </li>
              <li className="text-gray-700">
                <strong>Load distribution variability</strong> under repeated compression cycles was flagged in
                industrial wear durability trials, especially under cold-weather stress patterns.
              </li>
            </ul>
          </section>

          {/* Customer Sentiment */}
          <section>
            <p className="text-gray-700 leading-relaxed mb-4">
              Customer sentiment reflects both enthusiasm and precision feedback. In the Product Validation
              Summary, 63% of enterprise partners cited performance consistency as the top priority for full-scale
              deployment.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Weekly validation reports show a noticeable spike in stress-pattern anomalies beginning May 16,
              aligning directly with accelerated endurance testing protocols.
            </p>
          </section>

          {/* Objectives */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Objectives</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              ZenCore aims to refine adaptive response thresholds while strengthening long-term durability across
              varied environmental conditions. The integration includes cross-functional collaboration between
              Materials Science, Biomechanics Research, Product Engineering, and Industrial Design to recalibrate
              structural memory and torsion-response timing.
            </p>
          </section>

          {/* Early Validation */}
          <section className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-6">
            <div className="flex gap-6">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Early validation reveals that adaptive systems often...
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Required tuned calibration during edge-case scenarios where rapid temperature shifts and abrupt
                  motion changes push methods. Field teams emphasized the importance of predictable recovery rates
                  and transparent performance diagnostics to ensure trust in adaptive behavior.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Participants highlighted the need for measurable benchmarks that demonstrate both resilience and
                  real-time responsiveness across athletic, medical, and industrial settings.
                </p>
              </div>
              <img
                src="/news-1.png"
                alt="Validation graphic"
                className="w-40 h-40 object-cover rounded-xl"
              />
            </div>
          </section>

          {/* Field Experience */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Field Experience Improvements
            </h2>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <span className="text-gray-400">•</span>
                <div>
                  <strong className="text-gray-900">Accelerated Calibration Protocols:</strong>
                  <span className="text-gray-700"> Implemented rapid stress-cycle testing for validation timelines without compromising structural integrity analysis.</span>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-gray-400">•</span>
                <div>
                  <strong className="text-gray-900">Enhanced Performance Telemetry:</strong>
                  <span className="text-gray-700"> Introduced detailed biometric response mapping to better understand airflow modulation, and fiber elasticity under load.</span>
                </div>
              </li>
            </ul>
          </section>

          {/* Statistics */}
          <section className="space-y-6 py-8">
            <div className="text-center">
              <div className="text-6xl font-bold text-gray-900 mb-2">47%</div>
              <p className="text-gray-700">
                increase in pilot program feedback following Fiber v2 expansion.
              </p>
            </div>
            <div className="text-center">
              <div className="text-6xl font-bold text-gray-900 mb-2">38%</div>
              <p className="text-gray-700">
                of high-exertion trials reported measurable dynamic tension lag.
              </p>
            </div>
            <div className="text-center">
              <div className="text-6xl font-bold text-gray-900 mb-2">24</div>
              <p className="text-gray-700">
                Documented endurance simulations triggering recalibration protocols during Phase 1 validation.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
