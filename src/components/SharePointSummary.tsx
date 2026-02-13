import {
  PlayIcon,
  UserGroupIcon,
  GiftIcon,
  RocketLaunchIcon,
  CalendarIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  XMarkIcon,
  ArrowTopRightOnSquareIcon,
  HandThumbUpIcon,
  ChatBubbleLeftIcon,
  SpeakerWaveIcon
} from '@heroicons/react/24/outline';

interface SharePointSummaryProps {
  isDetailPanelOpen: boolean;
  setIsDetailPanelOpen: (open: boolean) => void;
}

export function SharePointSummary({ isDetailPanelOpen, setIsDetailPanelOpen }: SharePointSummaryProps) {
  return (
    <div className="space-y-6 text-sm text-gray-900">
      {/* Greeting */}
      <div>
        <p className="text-base font-semibold mb-3">Hi Carole,</p>
        <p className="text-gray-700 leading-relaxed">
          Here's your personalized roundup of what's new at Company. I've picked the company updates most relevant to
          your team and role, spotlighted a few cross-team and <span className="font-semibold">teamwide highlights</span>.
          You'll see what could impact your <span className="font-semibold">smart fiber roadmap</span>, upcoming{' '}
          <span className="font-semibold">milestones</span>, key <span className="font-semibold">cross-team</span> work,
          plus a few <span className="font-semibold">events and highlights</span> you might enjoy along the way.
        </p>
      </div>

      {/* Video Highlights Section */}
      <div>
        <h2 className="text-lg font-bold mb-4">Let's start with video highlights</h2>
        <div className="relative rounded-2xl overflow-hidden">
          {/* Video Grid Background Image */}
          <img
            src="/video-grid.png"
            alt="Company highlights"
            className="w-full h-auto"
          />

          {/* Dark Overlay for Text Legibility */}
          <div className="absolute inset-0 bg-black/40"></div>

          {/* Centered Play Button */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <button className="w-16 h-16 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110">
              <PlayIcon className="w-8 h-8 text-gray-900 ml-1" />
            </button>
          </div>

          {/* Header Overlay */}
          <div className="absolute top-4 left-4 flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1.5 z-10">
            <PlayIcon className="w-4 h-4 text-white" />
            <span className="text-white text-xs font-medium">In the video</span>
          </div>
          <div className="absolute top-4 left-4 right-4 z-10">
            <p className="text-white font-semibold text-sm mt-10">Company highlights, personalized for you</p>
          </div>
        </div>
      </div>

      {/* Top Updates Section */}
      <div>
        <h2 className="text-lg font-bold mb-4">Top updates impacting your work</h2>

        {/* Update 1 */}
        <div className="mb-6">
          <div className="flex items-start gap-2 mb-3">
            <UserGroupIcon className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
            <h3 className="font-bold">1. Staffing changes across smart-fiber teams</h3>
          </div>
          <p className="text-gray-700 leading-relaxed mb-4">
            Alex Montana shared an update on upcoming staffing changes that may affect how design validation and
            roadmap planning align over the next few sprints. As new owners ramp up, teams may see some shifts in
            ownership and handoffs. Calling out dependencies early and staying aligned on timelines will help keep
            work moving smoothly during the transition.
          </p>

          {/* Quote Block */}
          <div className="border-l-4 border-gray-300 pl-4 py-3 bg-gray-50 rounded-r-lg">
            <p className="text-gray-800 italic leading-relaxed">
              "These changes set us up well long-term, but clear handoffs will matter so teams like Carole's can
              keep the smart-fiber work moving."
            </p>
          </div>
        </div>

        {/* Update 2 */}
        <div className="mb-6">
          <div className="flex items-start gap-2 mb-3">
            <GiftIcon className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
            <h3 className="font-bold">2. Time sensitive: Plan your yearly giving event</h3>
          </div>
          <p className="text-gray-700 leading-relaxed mb-2">
            To help kick in team participation early and make it easier to balance giving with delivery commitments,
            managers are asked to reach out by the end of the week with:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
            <li>Proposals for yearly giving activities</li>
            <li>Suggested beneficiary organizations</li>
            <li>Local team leads who can help coordinate giving efforts</li>
          </ul>
        </div>

        {/* Update 3 */}
        <div className="mb-6">
          <div className="flex items-start gap-2 mb-3">
            <RocketLaunchIcon className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
            <h3 className="font-bold">3. Quarterly goals set: what the plan means for you</h3>
          </div>
          <p className="text-gray-700 leading-relaxed mb-3">
            This quarter's plan focuses on advancing smart fiber development, tightening durability targets for core use
            cases, and strengthening coordination between product, design, and validation teams.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Priorities include validating new materials under real-world stress conditions, aligning on shared success
            criteria, and smoothing handoffs as work moves from concept into testing. It's a helpful snapshot of what to
            prioritize—and what to keep an eye on—as the quarter unfolds.
          </p>
        </div>
      </div>

      {/* News Updates Section */}
      <div>
        <h2 className="text-lg font-bold mb-4">Company news updates</h2>

        <div className="space-y-4">
          {/* Featured Article Card - Left */}
          <div
            className="bg-white border border-gray-200 rounded-2xl overflow-hidden p-6 cursor-pointer transition-all hover:border-gray-400 hover:shadow-lg"
            onClick={() => setIsDetailPanelOpen(true)}
          >
            {/* Image Grid */}
            <div className="grid grid-cols-3 gap-2 mb-6">
              <img src="/grid-1.png" alt="" className="rounded-lg w-full h-24 object-cover" />
              <img src="/grid-2.png" alt="" className="rounded-lg w-full h-24 object-cover" />
              <img src="/grid-3.png" alt="" className="rounded-lg w-full h-24 object-cover" />
              <img src="/grid-4.png" alt="" className="rounded-lg w-full h-24 object-cover" />
              <img src="/grid-5.png" alt="" className="rounded-lg w-full h-24 object-cover" />
              <img src="/grid-6.png" alt="" className="rounded-lg w-full h-24 object-cover" />
              <img src="/grid-7.png" alt="" className="rounded-lg w-full h-24 object-cover" />
              <img src="/grid-8.png" alt="" className="rounded-lg w-full h-24 object-cover" />
              <img src="/grid-9.png" alt="" className="rounded-lg w-full h-24 object-cover" />
            </div>

            {/* Source Info */}
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 bg-orange-500 rounded flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xs font-bold">=</span>
              </div>
              <span className="text-sm text-gray-600">Company blog · 1d</span>
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold mb-3">RTO is the most-asked topic ahead of the AMA</h3>

            {/* Description */}
            <p className="text-sm text-gray-700 leading-relaxed">
              CEO Wolf Riechtenstein will answer all of your burning questions at the upcoming company event. Submit your questions ahead of time to make sure they're addressed in next week's AMA.
            </p>
          </div>

          {/* Headlines List Card - Right */}
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Discover more headlines</h3>
              <ChevronRightIcon className="w-6 h-6 text-gray-900" />
            </div>

            {/* Headlines List */}
            <div className="space-y-6">
              {/* Headline 1 */}
              <div className="flex gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-5 h-5 bg-cyan-500 rounded flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-bold">~</span>
                    </div>
                    <span className="text-xs text-gray-600">The Source · 2h</span>
                  </div>
                  <h4 className="font-semibold text-base leading-snug">
                    Quarterly priorities set for Company product teams
                  </h4>
                </div>
                <img src="/news-1.png" alt="" className="w-24 h-24 rounded-xl object-cover flex-shrink-0" />
              </div>

              {/* Headline 2 */}
              <div className="flex gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-5 h-5 bg-orange-500 rounded flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-bold">◎</span>
                    </div>
                    <span className="text-xs text-gray-600">Company News · 7h</span>
                  </div>
                  <h4 className="font-semibold text-base leading-snug">
                    CompanyCore Fiber v2 enters durability validation phase
                  </h4>
                </div>
                <img src="/news-2.png" alt="" className="w-24 h-24 rounded-xl object-cover flex-shrink-0" />
              </div>

              {/* Headline 3 */}
              <div className="flex gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-5 h-5 bg-cyan-500 rounded flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-bold">~</span>
                    </div>
                    <span className="text-xs text-gray-600">The Source · 10h</span>
                  </div>
                  <h4 className="font-semibold text-base leading-snug">
                    Smart-fiber durability targets rise across the industry
                  </h4>
                </div>
                <img src="/news-4.png" alt="" className="w-24 h-24 rounded-xl object-cover flex-shrink-0" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Events Section */}
      <div>
        <h2 className="text-lg font-bold mb-4">Upcoming events</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          <span className="font-semibold">Just a reminder</span> — you're confirmed for this week's company happy hour
          and will be joining a roundtable discussion on the future of product development on March 6.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          Here are some more upcoming events to consider, including one at your home office, and one hosted by your manager:
        </p>

        {/* Events Carousel */}
        <div className="relative">
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {/* Event 1 */}
            <div className="flex-shrink-0 w-48 bg-white border border-gray-200 rounded-xl overflow-hidden">
              <div className="p-3">
                <div className="text-center mb-2">
                  <div className="text-2xl font-bold">9</div>
                  <div className="text-xs text-gray-600">Mar</div>
                </div>
                <img src="/event-1.png" alt="Company AMA" className="w-full h-20 object-cover rounded-lg mb-2" />
                <p className="font-semibold text-xs mb-1">Company AMA</p>
                <p className="text-xs text-gray-600">2:00 PM</p>
                <p className="text-xs text-gray-500">Online</p>
              </div>
            </div>

            {/* Event 2 */}
            <div className="flex-shrink-0 w-48 bg-white border border-gray-200 rounded-xl overflow-hidden">
              <div className="p-3">
                <div className="text-center mb-2">
                  <div className="text-2xl font-bold">24</div>
                  <div className="text-xs text-gray-600">Mar</div>
                </div>
                <img src="/event-2.png" alt="Discovery Hour" className="w-full h-20 object-cover rounded-lg mb-2" />
                <p className="font-semibold text-xs mb-1">Discovery Hour: Delivery...</p>
                <p className="text-xs text-gray-600">3:00 PM</p>
                <p className="text-xs text-gray-500">Building C</p>
              </div>
            </div>

            {/* Event 3 */}
            <div className="flex-shrink-0 w-48 bg-white border border-gray-200 rounded-xl overflow-hidden">
              <div className="p-3">
                <div className="text-center mb-2">
                  <div className="text-2xl font-bold">9</div>
                  <div className="text-xs text-gray-600">Apr</div>
                </div>
                <img src="/event-3.png" alt="Sales event" className="w-full h-20 object-cover rounded-lg mb-2" />
                <p className="font-semibold text-xs mb-1">Sales...</p>
                <p className="text-xs text-gray-600">9:00 AM</p>
                <p className="text-xs text-gray-500">Online</p>
              </div>
            </div>

            {/* Event 4 */}
            <div className="flex-shrink-0 w-48 bg-white border border-gray-200 rounded-xl overflow-hidden">
              <div className="p-3">
                <div className="text-center mb-2">
                  <div className="text-2xl font-bold">13</div>
                  <div className="text-xs text-gray-600">Apr</div>
                </div>
                <img src="/event-4.png" alt="Team happy hour" className="w-full h-20 object-cover rounded-lg mb-2" />
                <p className="font-semibold text-xs mb-1">Team 'happy hour'</p>
                <p className="text-xs text-gray-600">5:00 PM</p>
                <p className="text-xs text-gray-500">Local office</p>
              </div>
            </div>

            {/* Event 5 */}
            <div className="flex-shrink-0 w-48 bg-white border border-gray-200 rounded-xl overflow-hidden">
              <div className="p-3">
                <div className="text-center mb-2">
                  <div className="text-2xl font-bold">6</div>
                  <div className="text-xs text-gray-600">May</div>
                </div>
                <img src="/event-5.png" alt="Cloud & AI Evolution" className="w-full h-20 object-cover rounded-lg mb-2" />
                <p className="font-semibold text-xs mb-1">Cloud & AI Evolution...</p>
                <p className="text-xs text-gray-600">1:00 PM</p>
                <p className="text-xs text-gray-500">Conference</p>
              </div>
            </div>

            {/* Event 6 */}
            <div className="flex-shrink-0 w-48 bg-white border border-gray-200 rounded-xl overflow-hidden">
              <div className="p-3">
                <div className="text-center mb-2">
                  <div className="text-2xl font-bold">20</div>
                  <div className="text-xs text-gray-600">May</div>
                </div>
                <img src="/event-6.png" alt="Maker event" className="w-full h-20 object-cover rounded-lg mb-2" />
                <p className="font-semibold text-xs mb-1">Make...</p>
                <p className="text-xs text-gray-600">10:00 AM</p>
                <p className="text-xs text-gray-500">Online</p>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 w-8 h-8 bg-white border border-gray-300 rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50">
            <ChevronLeftIcon className="w-4 h-4 text-gray-600" />
          </button>
          <button className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 w-8 h-8 bg-white border border-gray-300 rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50">
            <ChevronRightIcon className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Footer Sources */}
      <div className="pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-600 mb-3">
          Sources: <span className="inline-flex items-center gap-1">
            <span className="w-4 h-4 bg-red-600 rounded-sm inline-block"></span>
            <span className="w-4 h-4 bg-blue-600 rounded-sm inline-block"></span>
            <span className="w-4 h-4 bg-green-600 rounded-sm inline-block"></span>
            <span className="text-gray-700">+3</span>
          </span>
        </p>
      </div>

      {/* Footer Actions */}
      <div className="space-y-2 pt-2">
        <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
          <PlayIcon className="w-4 h-4" />
          <span>Create an audio summary of personalized updates</span>
        </button>
        <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
          <CalendarIcon className="w-4 h-4" />
          <span>Show me more upcoming events</span>
        </button>
      </div>
    </div>
  );
}
