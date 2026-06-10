"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./profile.module.css";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

export default function ProfilesPage() {
  const router = useRouter();
  const [name] = useState("Alex Mercer");
  const [username] = useState("alexmercer");
  const [isLocked, setIsLocked] = useState(true);

  const courseAnalysisData = [
    { language: "JS", fullName: "JavaScript", completed: 6, color: "linear-gradient(180deg, #F7DF1E 0%, #D8BE10 100%)" },
    { language: "Py", fullName: "Python", completed: 4, color: "linear-gradient(180deg, #3776AB 0%, #26557B 100%)" },
    { language: "TS", fullName: "TypeScript", completed: 3, color: "linear-gradient(180deg, #3178C6 0%, #1D5493 100%)" },
    { language: "SQL", fullName: "SQL Database", completed: 1, color: "linear-gradient(180deg, #A855F7 0%, #7E22CE 100%)" },
    { language: "Go", fullName: "Go Language", completed: 0, color: "linear-gradient(180deg, #00ADD8 0%, #007C9B 100%)" },
  ];

  // Generate a mock list of 96 cells for the activity heatmap (representing 16 weeks of logs)
  const mockActivityLog = [
    0, 1, 0, 2, 0, 0, 3, 1, 0, 0, 2, 4, 1, 0, 0, 0, 3, 2, 1, 0, 1, 2, 0, 0,
    0, 2, 0, 1, 4, 3, 0, 0, 1, 2, 0, 0, 3, 0, 0, 1, 2, 2, 3, 1, 0, 0, 4, 1,
    0, 0, 1, 2, 0, 3, 4, 2, 1, 0, 0, 2, 3, 1, 0, 0, 1, 0, 2, 3, 4, 1, 0, 0,
    2, 1, 0, 0, 3, 4, 2, 0, 0, 1, 2, 3, 1, 0, 4, 3, 2, 1, 0, 0, 2, 1, 0, 3
  ];

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>Developer Profile</h1>
        <p className={styles.subtitle}>Manage your Legentia learning path, stats, and account settings.</p>
      </div>

      {/* Hero Card */}
      <div className={styles.heroCard}>
        <div className={styles.avatarWrapper}>
          <div className={styles.avatar}>
            AM
          </div>
        </div>
        <div className={styles.profileInfo}>
          <div className={styles.nameRow}>
            <h2 className={styles.name}>{name}</h2>
            <span className={`${styles.badge} ${styles.proBadge}`}>Pro Tier</span>
          </div>
          <p className={styles.username}>@{username}</p>
        </div>
        <div className={styles.actionButtons}>
          <Link href="/subscriptions" className={`${styles.btn} ${styles.goldenBtn}`}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <line x1="2" x2="22" y1="10" y2="10" />
            </svg>
            Manage Subscription
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statValue}>12 Days</span>
            <span className={styles.statLabel}>Learning Streak</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </div>
          {isLocked ? (
            <span className={styles.lockedContainer}>
              <div className={styles.statInfo}>
                <span className={styles.statValue}>3,450 XP</span>
                <span className={styles.statLabel}>Total Points</span>
              </div>
            </span>
          ) : (
            <div className={styles.statInfo}>
              <span className={styles.statValue}>3,450 XP</span>
              <span className={styles.statLabel}>Total Points</span>
            </div>
          )}
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" />
            </svg>
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statValue}>6 Courses</span>
            <span className={styles.statLabel}>Completed</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 22V10h4v12" />
              <path d="M10 22V6h4v16" />
              <path d="M16 22V14h4v8" />
              <path d="M2 22h20" />
            </svg>
          </div>
          {isLocked ? (
            <span className={styles.lockedContainer}>
              <div className={styles.statInfo}>
                <span className={styles.statValue}>18th</span>
                <span className={styles.statLabel}>Global Rank</span>
              </div>
            </span>
          ) : (
            <div className={styles.statInfo}>
              <span className={styles.statValue}>18th</span>
              <span className={styles.statLabel}>Global Rank</span>
            </div>
          )}
        </div>
      </div>

      {/* Main split details */}
      <div className={styles.splitLayout}>
        {/* Left Column: Learning Progress & Activity */}
        <div>
          {/* In Progress Courses
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
              </svg>
              Current Learning
            </h3>
            <div className={styles.courseProgressList}>
              <div className={styles.courseProgressItem}>
                <div className={styles.courseThumb}>NJS</div>
                <div className={styles.courseDetails}>
                  <h4 className={styles.courseName}>Next.js 16 Deep Dive & Core Concepts</h4>
                  <div className={styles.progressBarContainer}>
                    <div className={styles.progressBarBg}>
                      <div className={styles.progressBarFill} style={{ width: "85%" }}></div>
                    </div>
                    <span className={styles.progressText}>85%</span>
                  </div>
                </div>
              </div>

              <div className={styles.courseProgressItem}>
                <div className={styles.courseThumb}>RSC</div>
                <div className={styles.courseDetails}>
                  <h4 className={styles.courseName}>Advanced React Server Components</h4>
                  <div className={styles.progressBarContainer}>
                    <div className={styles.progressBarBg}>
                      <div className={styles.progressBarFill} style={{ width: "40%" }}></div>
                    </div>
                    <span className={styles.progressText}>40%</span>
                  </div>
                </div>
              </div>

              <div className={styles.courseProgressItem}>
                <div className={styles.courseThumb}>SQL</div>
                <div className={styles.courseDetails}>
                  <h4 className={styles.courseName}>Database Indexing & Query Optimizations</h4>
                  <div className={styles.progressBarContainer}>
                    <div className={styles.progressBarBg}>
                      <div className={styles.progressBarFill} style={{ width: "15%" }}></div>
                    </div>
                    <span className={styles.progressText}>15%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          */}

          {/* Activity Heatmap */}
          <div className={styles.card}>
            <div className={styles.activityHeader}>
              <h3 className={styles.cardTitle} style={{ margin: 0, border: "none", padding: 0 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <path d="M3 9h18M9 21V9" />
                </svg>
                Learning Consistency
              </h3>
              <span className={styles.lockedContainer}>Active in the last 16 weeks</span>
            </div>
            {isLocked ? (
              <div className={styles.lockedContainer}>
                <div className={styles.activityGrid}>
                  {mockActivityLog.map((val, idx) => {
                    let cellClass = styles.activityCell;
                    if (val === 1) cellClass += ` ${styles.level1}`;
                    else if (val === 2) cellClass += ` ${styles.level2}`;
                    else if (val === 3) cellClass += ` ${styles.level3}`;
                    else if (val === 4) cellClass += ` ${styles.level4}`;
                    return <div key={idx} className={cellClass} title={`${val} lessons completed`} />;
                  })}
                </div>
              </div>
            ) : (
              <div className={styles.activityGrid}>
                {mockActivityLog.map((val, idx) => {
                  let cellClass = styles.activityCell;
                  if (val === 1) cellClass += ` ${styles.level1}`;
                  else if (val === 2) cellClass += ` ${styles.level2}`;
                  else if (val === 3) cellClass += ` ${styles.level3}`;
                  else if (val === 4) cellClass += ` ${styles.level4}`;
                  return <div key={idx} className={cellClass} title={`${val} lessons completed`} />;
                })}
              </div>
            )}
            {isLocked && (
              <>
                <button
                  className={`${styles.btn} ${styles.goldenBtn}`}
                  onClick={() => {
                    router.push("/subscriptions");
                  }}
                  style={{ marginTop: "10px", width: "100%" }}
                >
                  Unlock Learning Analytics
                </button>
              </>
            )}
          </div>
        </div>

        {/* Right Column: Course Analysis */}
        <div>
          <div className={styles.card}>
            <div className={styles.activityHeader}>
              <h3 className={styles.cardTitle} style={{ margin: 0, border: "none", padding: 0 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="20" x2="18" y2="10" />
                  <line x1="12" y1="20" x2="12" y2="4" />
                  <line x1="6" y1="20" x2="6" y2="14" />
                </svg>
                Course Analysis
              </h3>
              <span className={styles.lockedContainer}>Completed Courses</span>
            </div>

            {isLocked ? (
              <div className={styles.lockedContainer}>
                <div className={styles.chartWrapper}>
                  <div className={styles.yAxis}>
                    <div>12</div>
                    <div>9</div>
                    <div>6</div>
                    <div>3</div>
                    <div>0</div>
                  </div>
                  <div className={styles.chartContainer}>
                    <div className={styles.chartGrid}>
                      <div className={styles.barsContainer}>
                        {courseAnalysisData.map((item) => (
                          <div key={item.language} className={styles.barGroup}>
                            <div className={styles.barsPair}>
                              <div
                                className={styles.chartBar}
                                style={{
                                  height: `${(item.completed / 12) * 100}%`,
                                  background: item.color,
                                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
                                }}
                              >
                                <span className={styles.barValue}>
                                  {item.fullName}: {item.completed} Completed
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className={styles.chartWrapper}>
                  <div className={styles.yAxis}>
                    <div>12</div>
                    <div>9</div>
                    <div>6</div>
                    <div>3</div>
                    <div>0</div>
                  </div>
                  <div className={styles.chartContainer}>
                    <div className={styles.chartGrid}>
                      <div className={styles.barsContainer}>
                        {courseAnalysisData.map((item) => (
                          <div key={item.language} className={styles.barGroup}>
                            <div className={styles.barsPair}>
                              <div
                                className={styles.chartBar}
                                style={{
                                  height: `${(item.completed / 12) * 100}%`,
                                  background: item.color,
                                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
                                }}
                              >
                                <span className={styles.barValue}>
                                  {item.fullName}: {item.completed} Completed
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {isLocked && (
              <button
                className={`${styles.btn} ${styles.goldenBtn}`}
                onClick={() => {
                  router.push("/subscriptions");
                }}
                style={{ marginTop: "20px", width: "100%" }}
              >
                Unlock Learning Analytics
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}